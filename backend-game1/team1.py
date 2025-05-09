import asyncio
import asyncpg
import aioconsole
from config import DB_URL
from db import print_update, upsert_simulations, connect_listener, listen_for_updates, update_simulation_by_id

TEAM_NAME = "Team1"
async def main():
    pool = await asyncpg.create_pool(**DB_URL)
    await upsert_simulations(pool)
    conn = await pool.acquire()

    listen_conn = await connect_listener()  # Connect to listener for real-time updates
    
    # Listen for updates from other teams
    await listen_for_updates(listen_conn, TEAM_NAME, lambda v, a: print_update(pool, v, a))
    try:
        while True:
            await print_update(pool, '', False)  # Print the current state of the table

            id_input = await aioconsole.ainput("")

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
