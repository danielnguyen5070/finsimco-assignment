import asyncpg
import asyncio
from config import DB_URL

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS simulation (
    id SERIAL PRIMARY KEY,
    term TEXT,
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

-- Create the trigger
CREATE TRIGGER trg_simulation_notify
AFTER INSERT ON simulation
FOR EACH ROW EXECUTE FUNCTION notify_simulation_update();
"""

async def init_database():
    print("🔧 Connecting to the database...")
    conn = await asyncpg.connect(**DB_CONFIG)
    try:
        print("📦 Creating table if not exists...")
        await conn.execute(CREATE_TABLE_SQL)
        print("🚀 Creating trigger for LISTEN/NOTIFY...")
        await conn.execute(CREATE_TRIGGER_SQL)
        print("✅ Initialization complete.")
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(init_database())
