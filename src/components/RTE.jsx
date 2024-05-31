import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux';
import config from '../config/config';

function RTE({ name, control, defaultValue }) {
    const theme = useSelector(state => state.themeReducer.theme);
    const [editorKey, setEditorKey] = React.useState(0);

    React.useEffect(() => {
        setEditorKey(prev => prev + 1);
     }, [theme]);

  return (
    <>
          <Controller
              name={name || 'content'}
              control={control}
              render={({ field: { onChange,value } }) => (
                  <Editor
                      key={editorKey}
                      apiKey={config.tinymceApiKey}
                      initialValue={defaultValue}
                      value={value}
                      init={{
                          branding: false,
                          height: 400,
                          menubar: false,
                          skin: 'oxide-dark',
                          content_css:theme,
                          plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                          ],
                          toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange}
                  />
              )}
          />
      </>
  )
}

export default RTE