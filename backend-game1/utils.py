from tabulate import tabulate
from db import fetch_simulation_rows

def calculate_valuation(rows):
    try:
        ebitda = float(next(r['value'] for r in rows if r['term'] == 'EBITDA'))
        multiple = float(next(r['value'] for r in rows if r['term'] == 'Multiple'))
        return ebitda * multiple
    except:
        return 0
  
def render_table(rows):
    table = [(r['id'], r['term'], r['value'], r['unit'], "OK" if r['approved'] else "TBD") for r in rows]
    return tabulate(table, headers=["ID", "Term", "Value", "Unit", "Approved"])

async def print_update(pool, team_name: str):
    async with pool.acquire() as conn:
        rows = await fetch_simulation_rows(conn)
        table_text = render_table(rows)
        valuation = calculate_valuation(rows)

        print("\033c", end="")  # Clear screen
        print(team_name)
        print(table_text)
        print(f"\n- Valuation: {valuation:,.2f}")
        print("\n Type the ID of the row you want to edit or 'exit' to quit.\n")