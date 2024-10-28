"use client"

import {useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {useLiveText} from "@/hooks/liveText";
import {useParams} from "next/navigation";
import axios from "@/lib/axios";

export default function App({onFinish, data, onEdit}) {
  const editorRef = useRef(null);
  const {id} = useParams()
  const {addLiveTextRecord} = useLiveText({id})
  const [tgEmbed, setTgEmbed] = useState()
  const [title, setTitle] = useState('')
  const log = () => {
    if (editorRef.current) {
      onFinish(editorRef.current.getContent());
      console.log(editorRef.current.getContent());
    }
  };
  const formAction = formData =>{
    console.log('from1')
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log('form2', e.valueOf())
    const content = editorRef.current.getContent()
    addLiveTextRecord({
      id, content, tg_embed: tgEmbed, title
    })

  }

  return (
      <form onSubmit={onFormSubmit} className="mb-10" encType="multipart/form-data">
        <div className="mb-5">
          <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Large
            input</label>
          <input type="text" id="large-input"
                 value={title}
                 name="title"
                 onChange={e=>setTitle(e.target.value)}
                 className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>

        <Editor

            apiKey="b0vxrq8c3n7hepn2x3u3c9s8lf28p7rqyqcv2gycpt4o00at"
            onInit={(_evt, editor) => editorRef.current = editor}
            // initialValue={data.}
            onEditorChange={({newValue, editor}) => {
              onEdit(editorRef.current.getContent());
            }}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image','code' ,"media", 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | image | media | code ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              // a11y_advanced_options: true,
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



        <button type="submit"
                className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >Log editor content
        </button>
      </form>
  );
}

// import { useState, useEffect, useRef } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import {
//   ClassicEditor,
//   AccessibilityHelp,
//   Autoformat,
//   AutoImage,
//   Autosave,
//   BalloonToolbar,
//   BlockQuote,
//   Bold,
//   CloudServices,
//   Essentials,
//   Heading,
//   ImageBlock,
//   ImageCaption,
//   ImageInline,
//   ImageInsert,
//   ImageInsertViaUrl,
//   ImageResize,
//   ImageStyle,
//   ImageTextAlternative,
//   ImageToolbar,
//   ImageUpload,
//   Indent,
//   IndentBlock,
//   Italic,
//   Link,
//   LinkImage,
//   List,
//   ListProperties,
//   MediaEmbed,
//   PageBreak,
//   Paragraph,
//   PasteFromOffice,
//   SelectAll,
//   SimpleUploadAdapter,
//   Table,
//   TableCaption,
//   TableCellProperties,
//   TableColumnResize,
//   TableProperties,
//   TableToolbar,
//   TextTransformation,
//   TodoList,
//   Underline,
//   Undo
// } from 'ckeditor5';
// import translations from 'ckeditor5/translations/en.js'
// import 'ckeditor5/ckeditor5.css';
// import "./lt.css"
// const LiveTextEditor = ()=>{
//   const editorContainerRef = useRef(null);
//   const editorRef = useRef(null);
//   const [isLayoutReady, setIsLayoutReady] = useState(false);
//
//   useEffect(() => {
//     setIsLayoutReady(true);
//
//     return () => setIsLayoutReady(false);
//   }, []);
//
//   // const handleSubmit = (e)=>{
//   //   e.preventDefault();
//   //
//   //   console.log('FORM SUBNITTED')
//   //
//   // }
//
//   const editorConfig = {
//     toolbar: {
//       items: [
//         'undo',
//         'redo',
//         '|',
//         'heading',
//         '|',
//         'bold',
//         'italic',
//         'underline',
//         '|',
//         'pageBreak',
//         'link',
//         'insertImage',
//         'insertImageViaUrl',
//         'mediaEmbed',
//         'insertTable',
//         'blockQuote',
//         '|',
//         'bulletedList',
//         'numberedList',
//         'todoList',
//         'outdent',
//         'indent'
//       ],
//       shouldNotGroupWhenFull: false
//     },
//     plugins: [
//       AccessibilityHelp,
//       Autoformat,
//       AutoImage,
//       Autosave,
//       BalloonToolbar,
//       BlockQuote,
//       Bold,
//       CloudServices,
//       Essentials,
//       Heading,
//       ImageBlock,
//       ImageCaption,
//       ImageInline,
//       ImageInsert,
//       ImageInsertViaUrl,
//       ImageResize,
//       ImageStyle,
//       ImageTextAlternative,
//       ImageToolbar,
//       ImageUpload,
//       Indent,
//       IndentBlock,
//       Italic,
//       Link,
//       LinkImage,
//       List,
//       ListProperties,
//       MediaEmbed,
//       PageBreak,
//       Paragraph,
//       PasteFromOffice,
//       SelectAll,
//       SimpleUploadAdapter,
//       Table,
//       TableCaption,
//       TableCellProperties,
//       TableColumnResize,
//       TableProperties,
//       TableToolbar,
//       TextTransformation,
//       TodoList,
//       Underline,
//       Undo
//     ],
//     balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
//     heading: {
//       options: [
//         {
//           model: 'paragraph',
//           title: 'Paragraph',
//           class: 'ck-heading_paragraph'
//         },
//         {
//           model: 'heading1',
//           view: 'h1',
//           title: 'Heading 1',
//           class: 'ck-heading_heading1'
//         },
//         {
//           model: 'heading2',
//           view: 'h2',
//           title: 'Heading 2',
//           class: 'ck-heading_heading2'
//         },
//         {
//           model: 'heading3',
//           view: 'h3',
//           title: 'Heading 3',
//           class: 'ck-heading_heading3'
//         },
//         {
//           model: 'heading4',
//           view: 'h4',
//           title: 'Heading 4',
//           class: 'ck-heading_heading4'
//         },
//         {
//           model: 'heading5',
//           view: 'h5',
//           title: 'Heading 5',
//           class: 'ck-heading_heading5'
//         },
//         {
//           model: 'heading6',
//           view: 'h6',
//           title: 'Heading 6',
//           class: 'ck-heading_heading6'
//         }
//       ]
//     },
//     image: {
//       toolbar: [
//         'toggleImageCaption',
//         'imageTextAlternative',
//         '|',
//         'imageStyle:inline',
//         'imageStyle:wrapText',
//         'imageStyle:breakText',
//         '|',
//         'resizeImage'
//       ]
//     },
//     initialData:
//         '',
//     language: 'ro',
//     link: {
//       addTargetToExternalLinks: true,
//       defaultProtocol: 'https://',
//       decorators: {
//         toggleDownloadable: {
//           mode: 'manual',
//           label: 'Downloadable',
//           attributes: {
//             download: 'file'
//           }
//         }
//       }
//     },
//     list: {
//       properties: {
//         styles: true,
//         startIndex: true,
//         reversed: true
//       }
//     },
//     menuBar: {
//       isVisible: true
//     },
//     placeholder: 'Type or paste your content here!',
//     table: {
//       contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
//     },
//     translations: [translations]
//   };
//   return <div className="max-w-2xl mx-auto mt-5">
//     <div className="main-container">
//       <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
//         <div className="editor-container__editor">
//           <div ref={editorRef}>{isLayoutReady && <CKEditor
//               editor={ClassicEditor}
//               config={editorConfig}/>}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// }
//
// export default LiveTextEditor