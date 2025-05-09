from tabulate import tabulate

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