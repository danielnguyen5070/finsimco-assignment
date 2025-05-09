import asyncio
import asyncpg
import aioconsole
from tabulate import tabulate
from config import DB_URL_STRING
from db import create_pool, connect_listener, listen_for_updates, update_simulation_by_id

def calculate_valuation(rows):
    try:
        ebitda = float(next(r['value'] for r in rows if r['term'] == 'EBITDA'))
        multiple = float(next(r['value'] for r in rows if r['term'] == 'Multiple'))
        return ebitda * multiple
    except:
        return 0
  
async def fetch_simulation_rows(conn):
    return await conn.fetch("SELECT id, term, value, unit FROM simulation ORDER BY id")

def render_table(rows):
    table = [(r['id'], r['term'], r['value'], r['unit']) for r in rows]
    return tabulate(table, headers=["ID", "Term", "Value", "Unit"])

async def upsert_simulations(pool):
    query = """
    INSERT INTO simulation (term, value, unit)
    VALUES 
        ('EBITDA', NULL, '$'),
        ('Interest Rate', NULL, '%'),
        ('Multiple', NULL, 'x'),
        ('Factor Score', NULL, '#')
    ON CONFLICT (term) DO UPDATE SET
        value = NULL;
    """
    async with pool.acquire() as conn:
        await conn.execute(query)

async def update_simulation_by_id(pool, id, value):
    query = "UPDATE simulation SET value = $1 WHERE id = $2"
    async with pool.acquire() as conn:
        await conn.execute(query, value, int(id))

async def print_update(pool, value, approved):
    async with pool.acquire() as conn:
        rows = await fetch_simulation_rows(conn)
        table_text = render_table(rows)
        valuation = calculate_valuation(rows)

        print("\033c", end="")  # Clear screen
        print(table_text)
        print(f"\n- Valuation: {valuation:,.2f}")
        print("-  Type the ID of the row you want to edit or 'exit' to quit.\n")

TEAM_NAME = "Team1"
async def main():
    pool = await asyncpg.create_pool(DB_URL_STRING)
    await upsert_simulations(pool)
    conn = await pool.acquire()

    listen_conn = await connect_listener()  # Connect to listener for real-time updates
    
    # Listen for updates from other teams
    await listen_for_updates(listen_conn, TEAM_NAME, lambda v, a: print_update(pool, v, a))
    try:
        while True:
            await print_update(pool, '', False)  # Print the current state of the table

            id_input = await aioconsole.ainput("Select ID > ")

            if id_input.strip().lower() == "exit":
                break

            try:
                id_selected = int(id_input)
                new_value_input = await aioconsole.ainput(f"New value for ID {id_selected} > ")
                await update_simulation_by_id(pool, id_selected, new_value_input)
            except ValueError:
                print("----------- Invalid input. Please enter a valid number.")
                await asyncio.sleep(1)
            except asyncpg.PostgresError as e:
                print(f"----------- Database error: {e}")
                await asyncio.sleep(1)

    finally:
        await pool.release(conn)
        await pool.close()

if __name__ == "__main__":
    asyncio.run(main())
