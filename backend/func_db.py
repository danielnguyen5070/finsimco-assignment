import asyncpg
import asyncio
from config import DB_URL
from tabulate import tabulate
from utils import calculate_valuation

async def show_all_info(conn):
    rows = await conn.fetch("SELECT id, term, value, unit, approved FROM simulation ORDER BY id")
    table = [(r['id'], r['term'], r['value'], r['unit'], "OK" if r['approved'] else "TBD") for r in rows]
    print("\033c", end="")  # Clear screen
    print(tabulate(table, headers=["ID", "Term", "Value", "Unit", "Approval"]))
    if all(r['value'] is not None for r in rows):
        valuation = calculate_valuation(rows)
        print(f"\n→ Valuation: {valuation:,.2f}")

async def upsert_simulations(pool):
    query = """
    INSERT INTO simulation (term, value, unit)
    VALUES 
        ('EBITDA', '_', '$'),
        ('Interest Rate', '_', '%'),
        ('Multiple', '_', 'x'),
        ('Factor Score', '_', '#')
    ON CONFLICT (term) DO UPDATE SET
        value = EXCLUDED.value,
        unit = EXCLUDED.unit;
    """
    async with pool.acquire() as conn:
        await conn.execute(query)

async def main():
    conn = await asyncpg.connect(DB_URL)
    await show_all_info(conn)  # Initial fetch
