const generateHTML = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
        div.contentHtml * {
            max-width: 360px;
        }
      
    </style>
  </head>
  <body>
      <div class="contentHtml" >
        ${content || ''}
    </div>
  </body>
</html>
`

export default generateHTML