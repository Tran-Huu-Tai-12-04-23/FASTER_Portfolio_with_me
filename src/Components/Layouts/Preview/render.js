import domtoimage from "dom-to-image";

async function render() {
  const item = document.getElementById("wrapper_template_content");
  if (item) {
    await domtoimage
      .toPng(item)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        // console.log(img.src);
        const preview = document.getElementById("preview");
        img.setAttribute("id", "img_preview");
        const imgPreview = document.getElementById("img_preview");
        if (preview) {
          if (imgPreview) {
            imgPreview.remove();
          }
          preview.appendChild(img);
        } else {
          preview.appendChild(img);
        }
        return img.src;
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }
}

export default render;
