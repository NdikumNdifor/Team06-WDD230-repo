import ExternalServices from "./ExternalServices.mjs";
import { qs } from "./utils.mjs";

function getModalTemplate(product) {
  return `
        <h2>${product.Brand.Name}</h2>
        <h3>${product.NameWithoutBrand}</h3>
        <img src="${product.Images.PrimaryMedium}" alt="medium sized image">
        ${product.DescriptionHtmlSimple}
  `;
}

export class QuicklookModal {
  constructor() {
    this.modalWrapper = qs(".modal-wrapper");
    this.closebutton = qs(".close-button", this.modalWrapper);
    this.registerCloseHandler()
    this.externalService = new ExternalServices();
  }
  async open(id) {
    const section = qs("section", this.modalWrapper);
    section.innerHTML = "";
    this.modalWrapper.classList.toggle("open");
    const product = await this.externalService.findProductById(id);
    const content = getModalTemplate(product);
    section.innerHTML = content;
  }

  close() {
    this.modalWrapper.classList.toggle("open");
  }

  registerCloseHandler() {
    this.closebutton.addEventListener("click", () => 
      this.close()
  )
  }
}
