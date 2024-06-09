from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS
from pytube import YouTube
import requests
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route("/")
def home_page():
    return 'Hello Word'



@app.route("/download", methods=['POST'])
def download_video():
    data = request.get_json()
    url = data.get('url')
    print(url)

    try:
        yt=YouTube(url)
        stream = yt.streams.get_highest_resolution()
        stream_url = stream.url
        video_info = {
            "title" : yt.title,
            "thumbnail" : yt.thumbnail_url,
            "stream_url" : stream_url
        }

        return jsonify({"message": "Download successful!", "video_info" : video_info}), 200
    except Exception as e: 
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    

    
@app.route("/proxy_download", methods=['GET'])
def proxy_download():
    stream_url = request.args.get('stream_url')
    title = request.args.get('title')
    try:
        response = requests.get(stream_url, stream=True)
        response.raise_for_status()  

        print("Video downloaded successfully from stream URL")
    except requests.RequestException as e:
        print(f"Error downloading the video: {e}")
        return Response(f"Error downloading the video: {e}", status=500)
    
    file_stream = BytesIO()
    total_size = 0
    for chunk in response.iter_content(chunk_size=1024):
        if chunk:
            file_stream.write(chunk)
            total_size += len(chunk)
    file_stream.seek(0)
    print(f"Total size of downloaded video: {total_size} bytes")
    return send_file(file_stream, as_attachment=True, download_name=f'{title}.mp4', mimetype='video/mp4')
    

if __name__ == '__main__':
    app.run(debug=True)