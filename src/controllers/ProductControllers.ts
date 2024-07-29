import "reflect-metadata";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Params,
  NotFoundError,
  BadRequestError,
} from "routing-controllers";
import { ProductDTO } from "../dto/Product";
import { MESSAGE_ERROR } from "../const/message-error.const";
import { ProductInterface } from "../interfaces/product.interface";

@JsonController("/products")
export class ProductController {
  products: ProductInterface[] = [
    {
      id: 'id-uno',
      name: 'Visa Classic Credit',
      description: 'Producto de prueba',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Classic/visa_classic_card_800x450.jpg'
    },
    {
      id: 'id-dos',
      name: 'Visa Gold Credit',
      description: 'Producto de prueba',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Gold/visa_gold_card_800x450.jpg'
    },
    {
      id: 'id-tres',
      name: 'Visa Infinite Credit',
      description: 'Producto de prueba',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/affluent/infinite-1.jpg'
    },
    {
      id: 'id-cuatro',
      name: 'Visa Classic Credit',
      description: 'Producto de prueba',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Classic/visa_classic_card_800x450.jpg'
    },
    {
      id: 'id-cinco',
      name: 'Visa Gold Credit',
      description: 'Producto de prueba',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Gold/visa_gold_card_800x450.jpg'
    },
    {
      id: 'id-seis',
      name: 'Visa Infinite Credit',
      description: 'Producto de prueba',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/affluent/infinite-1.jpg'
    },{
      id: 'id-siete',
      name: 'Visa Classic Credit',
      description: 'Producto de prueba',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Classic/visa_classic_card_800x450.jpg'
    },
    {
      id: 'id-ocho',
      name: 'Visa Gold Credit',
      description: 'Producto de prueba',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Gold/visa_gold_card_800x450.jpg'
    },
    {
      id: 'id-nueve',
      name: 'Visa Infinite Credit',
      description: 'Producto de prueba',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/affluent/infinite-1.jpg'
    },
    
  ];

  @Get("")
  getAll() {
    return this.products
    
  }

  @Get("/verification/:id")
  verifyIdentifier(@Param("id") id: number | string) {
    return this.products.some((product) => product.id === id);
  }

  @Get("/:id")
  getOne(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
    return this.products.find((product) => product.id === id);
  }

  @Post("")
  createItem(@Body({ validate:true }) productItem: ProductDTO) {
    
    const index = this.findIndex(productItem.id);

    if(index !== -1) {
      throw new BadRequestError(MESSAGE_ERROR.DuplicateIdentifier);
    }
    
    this.products.push(productItem);
    return {
      message: "Product added successfully",
      data: productItem,
    };
  }

  @Put("/:id")
  put(@Param("id") id: number | string, @Body() productItem: ProductInterface) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    this.products[index] = {
      ...this.products[index],
      ...productItem,
    };
    return {
      message: "Product updated successfully",
      data: productItem,
    };
  }

  @Delete("/:id")
  remove(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
        
    this.products = [...this.products.filter((product) => product.id !== id)];
    return {
      message: "Product removed successfully",
    };
  }

  private findIndex(id: number | string) {
    return this.products.findIndex((product) => product.id === id);
  }

}
