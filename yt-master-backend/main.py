import tkinter as tk
import customtkinter
from interface import YoutubeDownloaderInterface

if __name__ == "__main__":
    app = customtkinter.CTk()
    app.geometry("720x480")
    app.title("Youtube Downloader")

    youtube_interface = YoutubeDownloaderInterface(app)
    app.mainloop()