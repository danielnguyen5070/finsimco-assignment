import asyncio
import asyncpg
import aioconsole
from config import DB_URL
from db import print_update, upsert_simulations, connect_listener, listen_for_updates, update_bid_masters_by_id_2

TEAM_NAME = "Team2"
async def main():
    pool = await asyncpg.create_pool(**DB_URL)
    await upsert_simulations(pool)
    conn = await pool.acquire()

    listen_conn = await connect_listener()  # Connect to listener for real-time updates
    
    # Listen for updates from other teams
    await listen_for_updates(listen_conn, TEAM_NAME, lambda : print_update(pool, TEAM_NAME))
    try:
        while True:
            await print_update(pool, TEAM_NAME)  # Print the current state of the table

            id_input = await aioconsole.ainput("")

            if id_input.strip().lower() == "exit":
                break

            try:
                id_selected = int(id_input)
                new_value_input = await aioconsole.ainput(f"New investors for ID {id_selected} > ")

                new_values = new_value_input.split(",")
                if len(new_values) != 3:
                    print("----------- Invalid input. Please enter both 'price' and 'share' in the format 'price, share'.")
                    await asyncio.sleep(1)
                    continue
                new_invester_1 = new_values[0].strip()
                new_invester_2 = new_values[1].strip()
                new_invester_3 = new_values[2].strip()

                await update_bid_masters_by_id_2(pool, id_selected, new_invester_1, new_invester_2, new_invester_3)
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
