from tabulate import tabulate

def extract_investor_bids(rows):
    investor_bids = {
        "Investor1": {},
        "Investor2": {},
        "Investor3": {}
    }

    for row in rows:
        company = row['company']
        investor_bids["Investor1"][company] = float(row['invester1'] or 0)
        investor_bids["Investor2"][company] = float(row['invester2'] or 0)
        investor_bids["Investor3"][company] = float(row['invester3'] or 0)

    return investor_bids

def extract_available_shares(rows):
    shares = {}
    for row in rows:
        shares[row["company"]] = float(row["share"] or 0)
    return shares

def extract_prices(rows):
    prices = {}
    for row in rows:
        company = row['company']
        prices[company] = float(row['price'] or 0)
    return prices

def calculate_shares_bid_for(investor_bids):
    result = {"Company 1": 0, "Company 2": 0, "Company 3": 0}

    for investor, bids in investor_bids.items():
        for company, shares in bids.items():
            result[company] += float(shares)

    return result
  
def calculate_capital_raised(shares_bid_for, prices):
    capital_raised = {}

    for company, shares in shares_bid_for.items():
        price = prices.get(company, 0)  # Default to 0 if company not found
        capital_raised[company] = shares * price

    return capital_raised

def return_subscription(shares_bid_for, available_shares):
    subscription_status = {}
    for company, shares_bid in shares_bid_for.items():
        available = available_shares.get(company, 0)  # Default to 0 if company not found
        if shares_bid < available:
            subscription_status[company] = "Under"
        elif shares_bid > available:
            subscription_status[company] = "Over"
        else:
            subscription_status[company] = "Fully"
    return subscription_status

def render_table(rows):
    table = [(r['id'], r['company'], r['price'], r['share'], r['invester1'], r['invester2'], r['invester3']) for r in rows]
    return tabulate(table, headers=["ID", "Companny", "Price", "Share", "Invester1", "Invester2", "Invester3"])