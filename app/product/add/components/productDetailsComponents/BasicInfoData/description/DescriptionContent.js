import TextEditor from "@/components/TextEditor/index_2";

 
export const DescriptionContent=({name,content,handleChange})=>{
 
    return(
      
        <TextEditor
          content={content}
             handleChange={handleChange} 
            name={name}
          />
    )
}