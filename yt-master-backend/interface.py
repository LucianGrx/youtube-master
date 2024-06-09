import tkinter as tk
import customtkinter
from pytube import YouTube
from utils import select_directory, reset_interface, downloadVideo, on_process

class YoutubeDownloaderInterface:
    def __init__(self, master):
        self.master = master
        self.create_widgets()
        self.download_directory = tk.StringVar()
        customtkinter.set_appearance_mode("system")
        customtkinter.set_default_color_theme("blue")

    def create_widgets(self):
        #Title
        self.title = customtkinter.CTkLabel(self.master, text="Insert the link", font=("Arial", 20), width=200, height=50, text_color="white")
        self.title.pack(padx=10, pady=10)
        
        #Url Entry
        self.url_var = tk.StringVar()
        self.link = customtkinter.CTkEntry(self.master, font=("Arial", 20), width=500, height=50, textvariable=self.url_var)
        self.link.pack(padx=10, pady=10)

        #Finish Label
        self.finishLabel = customtkinter.CTkLabel(self.master, text="", font=("Arial", 20), width=200, height=50, text_color="white")
        self.finishLabel.pack(padx=1, pady=1)

        #Progress Label
        self.progress = customtkinter.CTkLabel(self.master, text="0%", font=("Arial", 20), width=200, height=50, text_color="white")
        self.progress.pack(padx=1, pady=1)

        #Progress Bar
        self.progressbar = customtkinter.CTkProgressBar(self.master, width=500, height=10)
        self.progressbar.set(0)
        self.progressbar.pack(padx=5, pady=1)

        #Quality Menu
        self.quality_option = customtkinter.StringVar()
        self.quality_option.set("Select Quality")
        self.quality_menu = customtkinter.CTkOptionMenu(self.master, variable=self.quality_option, values=["highQuality", "lowQuality", "audio", "fullHd", "4k"])
        self.quality_menu.configure(font=("Arial", 18), width=20, height=10)
        self.quality_menu.pack(padx=10, pady=10)

        #Download Button

        self.download_button = customtkinter.CTkButton(
        self.master,
        text="Download",
        font=("Arial", 20),
        width=20,
        height=10,
        command=self.download_video
)
        self.download_button.pack(padx=10, pady=10)

        #Select Directory Button
        self.select_directory_button = customtkinter.CTkButton(self.master, text="Select Folder", font=("Arial", 20), width=20, height=10, command=self.select_directory)
        self.select_directory_button.pack(padx=10, pady=10)

        #Copyright
        self.copyright = customtkinter.CTkLabel(self.master, text="© 2024 - All rights reserved by Lucian", font=("Arial", 12), width=200, height=50, text_color="gray")
        self.copyright.place(relx=1, rely=1, anchor='se', x=-10)

    def select_directory(self):
        select_directory(self.download_directory, self.finishLabel)
        
    def reset_interface(self):
        reset_interface(self.url_var, 
                        self.quality_option, 
                        self.progress, 
                        self.progressbar, 
                        self.finishLabel, 
                        self.title)

    def download_video(self):
        downloadVideo(self.quality_option.get(),
                      self.download_directory, 
                      self.link, 
                      self.finishLabel, 
                      self.title, 
                      self.master, 
                      self.on_process,
                      self.reset_interface)
        
    def on_process(self, stream, chunk, bytes_remaining):
        on_process(stream, chunk, bytes_remaining, self.progress, self.progressbar)