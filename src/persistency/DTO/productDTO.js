class ProductDTO {
  constructor({ title, price, thumbnail }) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  #toJSON = () => {
    return {
      title: this.title,
      price: this.price,
      thumbnail: this.thumbnail,
    };
  };

  static toDTO = (products) => {
    if (Array.isArray(products)) {
      return products.map((product) => new ProductDTO(product).#toJSON()); 
    } else return new ProductDTO(products);
  };
}

export default ProductDTO;
