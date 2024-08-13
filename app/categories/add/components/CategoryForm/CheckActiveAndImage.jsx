import UploadFile from "@/app/product/components/UploadFile";
import MediaUploader from "@/components/MediaUploader/Index";
import { produce } from "immer";
import { useState } from "react";

export default function CheckActiveAndImage({ formData, setFormData }) {
  const [urlsFiles, setUrlsFiles] = useState([]);

  const [uploadLength, setUploadLength] = useState(0);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormData(
      produce((draft) => {
        draft[name] = JSON.parse(value);
      })
    );
  };

  return (
    <div>
      <div className="bg-white p-6 h-32 rounded-2xl">
        <p>Check Activity</p>
        <div className="flex items-center gap-4 mt-3">
          <input
            type="radio"
            name="isActive"
            id="active"
            value={true}
            checked={formData.isActive}
            onChange={(event) => handleChange(event)}
          />
          <label className="cursor-pointer" htmlFor="active">
            active
          </label>
        </div>
        <div className="flex items-center gap-4 mt-1">
          <input
            type="radio"
            name="isActive"
            id="dis-active"
            value={false}
            checked={!formData.isActive}
            onChange={(event) => handleChange(event)}
          />
          <label className="cursor-pointer" htmlFor="dis-active">
            dis active
          </label>
        </div>
      </div>
      <div className="bg-white p-6 h-72 rounded-2xl mt-6">
        <MediaUploader
          notURL
          type="single"
          urlsFiles={urlsFiles}
          setUrlsFiles={setUrlsFiles}
          setUploadLength={setUploadLength}
        />
      </div>
    </div>
  );
}
