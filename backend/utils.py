def calculate_valuation(rows):
    try:
        ebitda = float(next(r['value'] for r in rows if r['term'] == 'EBITDA'))
        multiple = float(next(r['value'] for r in rows if r['term'] == 'Multiple'))
        return ebitda * multiple
    except:
        return 0