def calculate_valuation(terms):
    valuation = 0
    for term in terms:
        if term.value is not None:
            valuation += term.value * 1000000  # Just an example calculation
    return valuation