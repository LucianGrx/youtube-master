import os
import tempfile
import traceback
import re
from pytube import YouTube
import tkinter as tk

def select_directory(download_directory, finishLabel):
    download_directory.set(tk.filedialog.askdirectory())
    finishLabel.configure(text=download_directory.get(), text_color="white")

def reset_interface(url_var, quality_option, progress, progressbar, finishLabel, title):
    url_var.set("")
    quality_option.set("Select Quality")
    progress.configure(text="0%", text_color="white")
    progressbar.set(0)
    finishLabel.configure(text="", text_color="white")
    title.configure(text="Insert the link", text_color="white")

def downloadVideo(option, download_directory, link, finishLabel, title, app, on_process, reset_interface):
    if not download_directory.get():
        finishLabel.configure(text="Select a folder", text_color="red")
        return
    try:
        url = link.get()
        ytObj = YouTube(url, on_progress_callback=on_process)
        if option == "highQuality":
            video = ytObj.streams.get_highest_resolution()
        elif option == "lowQuality":
            video = ytObj.streams.get_lowest_resolution()
        elif option == "audio":
            video = ytObj.streams.get_audio_only(subtype="mp4")
        elif option == "fullHd":
            video = ytObj.streams.filter(res="1080p", adaptive=True).first()
        elif option == "4k":
            video = ytObj.streams.filter(res="2160p", adaptive=True).first()
        else: 
            return
        
        title.configure(text=ytObj.title, text_color="white")
        finishLabel.configure(text="")
        # Download the video to a temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False)
        temp_file.close()
        video.download(output_path=os.path.dirname(temp_file.name), filename=os.path.basename(temp_file.name))
        
        # Generate a unique filename
        base_filename = ytObj.title
        base_filename = re.sub(r'[\\/*?:"<>|]', "", base_filename)
        filename = base_filename
        counter = 1
        while os.path.exists(os.path.join(download_directory.get(), filename + '.mp4')):
            filename = base_filename + f" ({counter})"
            counter += 1
        
        # Rename the temporary file to the unique filename
        os.rename(temp_file.name, os.path.join(download_directory.get(), filename + '.mp4'))
        
        finishLabel.configure(text="Download finished", text_color="green")
        app.after(5000, reset_interface)

    except:
        finishLabel.configure(text="Error", text_color="red")
        traceback.print_exc()

def on_process(stream, chunk, bytes_remaining, progress, progressbar):
    total_size = stream.filesize
    bytes_downloaded = total_size - bytes_remaining
    percentage = (bytes_downloaded / total_size) * 100
    per = str(int(percentage)) + "%"
    progress.configure(text=per, text_color="white")
    progress.update()

# Function to update the progress bar:
    
    progressbar.set(float(percentage) / 100)