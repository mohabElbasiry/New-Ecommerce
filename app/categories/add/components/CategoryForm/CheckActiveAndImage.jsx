
export default function CheckActiveAndImage() {
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
            onChange={(event) => handleChange(event)}
          />
          <label className="cursor-pointer" htmlFor="dis-active">
            dis active
          </label>
        </div>
      </div>
      <div className="bg-white p-6 h-72 rounded-2xl mt-6">
        <p>Image</p>
        <UploadFile
          notURL
          // setUrlsFiles={setUrlsFiles}
          // setUrlsFilesSelected={setUrlsFilesSelected}
          setUrlsFiles={[]}
          setUrlsFilesSelected={() => console.log("test")}
        />
      </div>
    </div>
  );
}
