import asyncio
import asyncpg
import aioconsole
from config import DB_URL
from db import connect_listener, listen_for_updates, update_simulation_approval, check_all_approved
from utils import print_update

TEAM_NAME = "Team2"
async def main():
    pool = await asyncpg.create_pool(**DB_URL)
    conn = await pool.acquire()
    listen_conn = await connect_listener()

    # Listen to simulation_channel notifications
    await listen_for_updates(listen_conn, TEAM_NAME, lambda: print_update(pool, TEAM_NAME))
    
    try:
        while True:
            if await check_all_approved(pool):
                print("-------> All values approved")
                break

            await print_update(pool, TEAM_NAME)  # Print the current state of the table
            
            id_input = await aioconsole.ainput("")
            if id_input.strip().lower() == "exit":
                break

            try:
                id_selected = int(id_input)
                yn_input = await aioconsole.ainput("Approve this term? (y = OK, n = TBD) > ")
                new_status = True if yn_input.strip().lower() == "y" else False
                await update_simulation_approval(pool, id_selected, new_status)
            except ValueError:
                print("⚠️ Invalid input. Please enter a valid number.")
                await asyncio.sleep(1)
            except asyncpg.PostgresError as e:
                print(f"⚠️ Database error: {e}")
                await asyncio.sleep(1)

    finally:
        await pool.release(conn)
        await pool.close()
if __name__ == "__main__":
    asyncio.run(main())
