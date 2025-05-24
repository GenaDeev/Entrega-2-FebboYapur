import Product from "../models/Product.js";

export default class ProductService {
  async getProducts({ limit = 10, page = 1, sort, query }) {
    const options = {
      page,
      limit,
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    };

    const filter = {};
    if (query) {
      if (query === "available") filter.status = true;
      else filter.category = query;
    }

    const result = await Product.paginate(filter, options);
    return result;
  }

  async getById(pid) {
    return await Product.findById(pid);
  }

  async create(data) {
    return await Product.create(data);
  }

  async update(pid, data) {
    return await Product.findByIdAndUpdate(pid, data, { new: true });
  }

  async delete(pid) {
    return await Product.findByIdAndDelete(pid);
  }
}
