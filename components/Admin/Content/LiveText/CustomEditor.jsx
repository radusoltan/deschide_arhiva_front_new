"use client"
import {useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {useLiveText} from "@/hooks/liveText";
import {useParams} from "next/navigation";



const CustomEditor = ({record, successEdit})=> {
  const {id} = useParams()
  const {addLiveTextRecord, updateLiveTextRecord} = useLiveText({id})
  const editorRef = useRef(null);
  const [content, setContent] = useState(record && record.content)
  const log = () => {



    if(record){

      updateLiveTextRecord({
        recordId: record.id,
        content: editorRef.current.getContent(),
        title: 'Some title',
        tg_embed: 'sssss',
        successAdd: (prop) => {
          successEdit(!prop)
        if (prop) {
          setContent(''); // Clear the editor content if successful
        }
      }
      })

    } else {
      addLiveTextRecord({
        id,
        content: editorRef.current.getContent(),
        title: 'Some title',
        tg_embed: 'sssss',
        successAdd: (prop) => {
          if (prop) {
            setContent(''); // Clear the editor content if successful
          }
        }
      })
    }

    // if (editorRef.current) {
    //   console.log(editorRef.current.getContent());
    // }
  };
  return <main>

    <Editor
        apiKey='b0vxrq8c3n7hepn2x3u3c9s8lf28p7rqyqcv2gycpt4o00at'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={content}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | link | image | blockquote | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          file_picker_callback: (cb, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.addEventListener('change', (e) => {
              const file = e.target.files[0];

              const reader = new FileReader();
              reader.addEventListener('load', () => {
                /*
                  Note: Now we need to register the blob in TinyMCEs image blob
                  registry. In the next release this part hopefully won't be
                  necessary, as we are looking to handle it internally.
                */
                const id = 'blobid' + (new Date()).getTime();
                const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
              });
              reader.readAsDataURL(file);
            });

            input.click();
          },
        }}
    />
    <button
        onClick={log}
        className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >SAVE</button>
  </main>

}

export default CustomEditor
