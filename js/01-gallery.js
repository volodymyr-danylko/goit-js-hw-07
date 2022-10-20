import { galleryItems } from "./gallery-items.js";

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class=gallery__item>
            <a class=gallery__link href=${preview}>
                <img
                    class="gallery__image"
                    src=${preview}
                    data-source=${original}
                    alt=${description}
                />
            </a>
        </div>`
  )
  .join("");

const gallery = document.querySelector(".gallery");

gallery.insertAdjacentHTML("afterbegin", markup);
gallery.addEventListener("click", handleImageClick);

function handleImageClick(event) {
  event.preventDefault();

  console.log(event.target);
  console.log(event.currentTarget);

  if (event.target === event.currentTarget) return;

  const currentImageSource = event.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src="${currentImageSource}" width="800"/>`,
    {
      onShow: () => {
        document.addEventListener("keydown", closeModal);
      },
      onClose: () => {
        document.removeEventListener("keydown", closeModal);
      },
    }
  );

  instance.show();

  function closeModal(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
