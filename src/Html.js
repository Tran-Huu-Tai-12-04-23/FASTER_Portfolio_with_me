import React from "react";

const Html = ({ content, state, scripts }) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Server Side Rendered React App !</title>
      </head>
      <body>{content}</body>
    </html>
  );
};

export default Html;
