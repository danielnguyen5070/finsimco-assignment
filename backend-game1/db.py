import asyncpg
import asyncio
from config import DB_URL

CHANNEL = "simulation_channel"

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS simulation (
    id SERIAL PRIMARY KEY,
    term TEXT UNIQUE,
    value TEXT,
    unit TEXT,
    approved BOOLEAN DEFAULT FALSE
);
"""

CREATE_TRIGGER_SQL = """
-- Create or replace the function
CREATE OR REPLACE FUNCTION notify_simulation_update() RETURNS trigger AS $$
BEGIN
    PERFORM pg_notify('simulation_channel', NEW.value || ':' || NEW.approved);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS trg_simulation_notify ON simulation;

-- Create the trigger to fire after INSERT or UPDATE
CREATE TRIGGER trg_simulation_notify
AFTER INSERT OR UPDATE ON simulation
FOR EACH ROW
EXECUTE FUNCTION notify_simulation_update();
"""

async def init_database():
    print("🔧 Connecting to the database...")
    conn = await asyncpg.connect(**DB_URL)
    try:
        print("📦 Creating table if not exists...")
        await conn.execute(CREATE_TABLE_SQL)
        print("🚀 Creating trigger for LISTEN/NOTIFY...")
        await conn.execute(CREATE_TRIGGER_SQL)
        print("✅ Initialization complete.")
    finally:
        await conn.close()

async def create_pool():
    return await asyncpg.create_pool(**DB_URL)

async def connect_listener():
    return await asyncpg.connect(**DB_URL)

async def update_simulation_by_id(pool, id, value):
    query = "UPDATE simulation SET value = $1 WHERE id = $2"
    async with pool.acquire() as conn:
        await conn.execute(query, value, int(id))

async def listen_for_updates(conn, team_name: str, callback_fn):
    def _callback(connection, pid, channel, payload):
        asyncio.create_task(callback_fn())  # Wrap in task
    await conn.add_listener(CHANNEL, _callback)

async def fetch_simulation_rows(conn):
    return await conn.fetch("SELECT id, term, value, unit, approved FROM simulation ORDER BY id")

async def upsert_simulations(pool):
    query = """
    INSERT INTO simulation (term, value, unit, approved)
    VALUES 
        ('EBITDA', NULL, '$', FALSE),
        ('Interest Rate', NULL, '%', FALSE),
        ('Multiple', NULL, 'x', FALSE),
        ('Factor Score', NULL, '#', FALSE)
    ON CONFLICT (term) DO UPDATE SET
        value = NULL,
        approved = FALSE;
    """
    async with pool.acquire() as conn:
        await conn.execute(query)

async def update_simulation_by_id(pool, id, value):
    query = "UPDATE simulation SET value = $1, approved = FALSE WHERE id = $2"
    async with pool.acquire() as conn:
        await conn.execute(query, value, int(id))

async def update_simulation_approval(pool, id, approved):
    query = "UPDATE simulation SET approved = $1 WHERE id = $2"
    async with pool.acquire() as conn:
        await conn.execute(query, approved, int(id))

async def check_all_approved(pool) -> bool:
    query = "SELECT COUNT(*) FROM simulation WHERE approved = FALSE"
    async with pool.acquire() as conn:
        count = await conn.fetchval(query)
        return count == 0
    
if __name__ == "__main__":
    asyncio.run(init_database())
