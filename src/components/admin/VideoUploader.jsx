"use client";
import { useState } from 'react';
import { Upload } from 'lucide-react';
export function VideoUploader({ onUploadComplete }) {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const handleUpload = async (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/upload', true);
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = Math.round((event.loaded / event.total) * 100);
                    setProgress(percentComplete);
                }
            };
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    onUploadComplete(data.url);
                }
                else {
                    console.error('Falha no envio:', xhr.statusText);
                }
                setIsUploading(false);
            };
            xhr.onerror = () => {
                console.error('Falha no envio:', xhr.statusText);
                setIsUploading(false);
            };
            xhr.send(formData);
        }
        catch (error) {
            console.error('Erro no envio:', error);
        }
        finally {
            setIsUploading(false);
        }
    };
    return (<div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center bg-blue-50">
      {isUploading ? (<div className="space-y-4">
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-blue-700">A enviar... {progress}%</p>
        </div>) : (<>
          <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-4">
            <Upload className="text-blue-600" size={24}/>
          </div>
          <p className="text-slate-700 mb-2">
            <span className="text-blue-600 font-medium">Clique para enviar</span> ou arraste o ficheiro
          </p>
          <p className="text-slate-500 text-sm mb-4">
            Arquivos MP4, MOV ou AVI (Máx. 2GB)
          </p>
          <input type="file" accept="video/*" onChange={handleUpload} className="hidden" id="video-upload"/>
          <label htmlFor="video-upload" className="px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
            Selecionar Vídeo
          </label>
        </>)}
    </div>);
}
