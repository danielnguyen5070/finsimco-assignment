import asyncio
import aioconsole
import signal
import sys
from db import create_pool, connect_listener, listen_for_updates, send_message

TEAM_NAME = "Team1"

def print_update(from_team, message):
    print(f"\n📨 Update from {from_team}: {message}\n> ", end="", flush=True)

async def message_loop(pool):
    while True:
        try:
            msg = await aioconsole.ainput("> ")  # Asynchronously wait for user input
            await send_message(pool, TEAM_NAME, msg)  # Send the message to the backend (PostgreSQL)
        except Exception as e:
            print(f"❌ Error: {e}")

async def wait_for_exit():
    print("⚠️ Signal handling is not supported on Windows. Press Enter to exit...")
    await aioconsole.ainput()  # Wait for Enter key press to exit
    print("\n👋 Exiting...")

async def main():
    print("✅ Running as Team1")
    pool = await create_pool()
    listen_conn = await connect_listener()
    await listen_for_updates(listen_conn, TEAM_NAME, print_update)

    loop = asyncio.get_event_loop()

    if sys.platform == "win32":
        # Start the wait for exit in a separate task on Windows
        exit_task = asyncio.create_task(wait_for_exit())
    else:
        # On Unix-like systems (Linux/macOS), use signal handling for graceful shutdown
        def stop():
            print("\n👋 Exiting...")
            loop.stop()

        for sig in (signal.SIGINT, signal.SIGTERM):
            loop.add_signal_handler(sig, stop)

    # Start the message loop
    await message_loop(pool)

    if sys.platform == "win32":
        # Wait for the exit task to finish on Windows
        await exit_task

if __name__ == "__main__":
    asyncio.run(main())
