import { Product } from "src/app/product/models/product";
import { Address } from "./address";

export class Supplier {
    id: string;
    nome: string;
    documento: string;
    ativo: boolean;
    tipoFornecedor: number;
    endereco: Address;
    produtos: Product[];
}