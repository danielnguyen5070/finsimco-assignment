import asyncpg
import asyncio
from config import DB_URL
from utils import render_table, calculate_shares_bid_for, extract_investor_bids, extract_prices, calculate_capital_raised, return_subscription, extract_available_shares

CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS bid_masters (
    id SERIAL PRIMARY KEY,
    company TEXT UNIQUE,
    price TEXT,
    share TEXT,
    invester1 TEXT,
    invester2 TEXT,
    invester3 TEXT
);
"""

CREATE_TRIGGER_SQL = """
-- Create the function to notify listeners
CREATE OR REPLACE FUNCTION notify_bid_masters_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Send a NOTIFY message on the "bid_masters_channel"
    PERFORM pg_notify('bid_masters_channel', 'updated');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS bid_masters_update_trigger ON bid_masters;

-- Create the trigger to call the function on UPDATE
CREATE TRIGGER bid_masters_update_trigger
AFTER UPDATE ON bid_masters
FOR EACH ROW
EXECUTE FUNCTION notify_bid_masters_update();
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

CHANNEL = "bid_masters_channel"

async def create_pool():
    return await asyncpg.create_pool(**DB_URL)

async def connect_listener():
    return await asyncpg.connect(**DB_URL)

async def update_bid_masters_by_id_1(pool, id, price, share):
    query = """
    UPDATE bid_masters
    SET price = $1, share = $2
    WHERE id = $3
    """
    async with pool.acquire() as conn:
        await conn.execute(query, price, share, int(id))

async def update_bid_masters_by_id_2(pool, id, invester1, invester2, invester3):
    query = """
    UPDATE bid_masters
    SET invester1 = $1, invester2 = $2, invester3 = $3
    WHERE id = $4
    """
    async with pool.acquire() as conn:
        await conn.execute(query, invester1, invester2, invester3, int(id))

async def listen_for_updates(conn, team_name: str, callback_fn):
    def _callback(connection, pid, channel, payload):
        asyncio.create_task(callback_fn())  # Wrap in task
    await conn.add_listener(CHANNEL, _callback)

async def fetch_simulation_rows(conn):
    return await conn.fetch("SELECT id, company, price, share, invester1, invester2, invester3 FROM bid_masters ORDER BY id")

async def upsert_simulations(pool):
    query = """
    INSERT INTO bid_masters (company, price, share, invester1, invester2, invester3)
    VALUES 
        ('Company 1', NULL, NULL, NULL, NULL, NULL),
        ('Company 2', NULL, NULL, NULL, NULL, NULL),
        ('Company 3', NULL, NULL, NULL, NULL, NULL)
    ON CONFLICT (company) DO UPDATE SET
        price = NULL,
        share = NULL,
        invester1 = NULL,
        invester2 = NULL,
        invester3 = NULL;
    """
    async with pool.acquire() as conn:
        await conn.execute(query)

async def print_update(pool, team_name: str = None):
    async with pool.acquire() as conn:
        rows = await fetch_simulation_rows(conn)
        table_text = render_table(rows)

        investor_bids = extract_investor_bids(rows)
        prices = extract_prices(rows)
        available_shares = extract_available_shares(rows)

        shares_bid_for = calculate_shares_bid_for(investor_bids)
        capital_raised = calculate_capital_raised(shares_bid_for, prices)
        subscription = return_subscription(shares_bid_for, available_shares)

        print("\033c", end="")  # Clear screen
        print(team_name)
        print(table_text)
        print(f"- Shares Bid For: {shares_bid_for}")
        print(f"- Capital Raised: {capital_raised}")
        print(f"- Subscription: {subscription}")
        print("\nType the ID of the row you want to edit or 'exit' to quit.\n")
        
if __name__ == "__main__":
    asyncio.run(init_database())
