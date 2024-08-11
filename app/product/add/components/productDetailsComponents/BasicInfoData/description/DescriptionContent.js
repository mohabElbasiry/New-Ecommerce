import TextEditor from "@/components/TextEditor/index_2";

 
export const DescriptionContent=({name,content,handleChange})=>{
    console.log('object');

    return(
        // <input 
        // className="border border-black"
        // value={content}
        //    onChange={handleChange} 
        //   name={name}
        // />
        <TextEditor
          content={content}
             handleChange={handleChange} 
            name={name}
          />
    )
}