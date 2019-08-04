const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  schema {
    query: RootQuery,
    mutation: RootMutation
  }

  type RootQuery {
    barang: [Barang!]!
    karyawan: [Karyawan!]!
    supplier: [Supplier!]!
    cart: [Cart!]!
    satuan: [Satuan!]!
    kategori: [Kategori!]!
    pelanggan: [Pelanggan!]!
    login(username: String!, password: String!): AuthData!
  }

  type RootMutation {
    # Barang
    addBarang(input: BarangInput!, satuan: SatuanInput!, kategori: KategoriInput): Barang
    updateBarang(id: ID!, input: BarangInput!, supplier: Supplier ,satuan: SatuanInput, kategori: KategoriInput): Barang
    deleteBarang(id: ID!): String

    # Kategori
    addKategori(input: KategoriInput!): Kategori
    updateKategori(id: ID!, input: KategoriInput!): Kategori
    deleteKategori(id: ID!): String
    
    # Satuan
    addSatuan(input: SatuanInput!): Satuan
    updateSatuan(id: ID!, input: SatuanInput!): Satuan
    deleteSatuan(id: ID!): String

    # Supplier
    addSupplier(input: SupplierInput!): Supplier
    updateSupplier(id: ID!, input: SupplierInput!): Supplier
    deleteSupplier(id: ID!): String

    # Karyawan
    addKaryawan(input: KaryawanInput!): Karyawan
    updateKaryawan(id: ID!, input: KaryawanInput!): Karyawan
    deleteKaryawan(id: ID!): String

    # Jabatan
    addJabatan(input: JabatanInput!): Jabatan
    updateJabatan(id: ID!, input: JabatanInput!): Jabatan
    deleteJabatan(id: ID!): String

    # Pelanggan
    addPelanggan(input: PelangganInput!): Pelanggan
    updatePelanggan(id: ID!, input: PelangganInput!): Pelanggan
    deletePelanggan(id: ID!): String

    # Cart
    addCart(input: CartInput!, pelanggan: PelangganInput!): Cart
    updateCart(id: ID!, input: CartInput!, pelanggan: PelangganInput, karyawan: KaryawanInput): Cart
    deleteCart(id: ID!): String

    # CartDetail
    addCartDetail(input: CartDetailInput!, barang: BarangInput!): CartDetail
    updateCartDetail(id: ID!, input: CartDetailInput!, barang: BarangInput): CartDetail
    deleteCartDetail(id: ID!): String
  }

  type AuthData {
    userId: ID!
    username: String!
    token: String!
    tokenExp: Int!
  }

  type Barang {
    _id: ID!
    nama: String!
    brand: String!
    stok: Int!
    hargaBeli: Float!
    hargaJual: Float!
    satuan: Satuan!
    kategori: Kategori!
    supplier: Supplier!
    createdAt: String!
    updatedAt: String!
  }

  type Supplier {
    _id: ID!
    nama: String!
    telepon: String!
    alamat: String!
    barang: [Barang!]!
  }

  type Karyawan {
    _id: ID!
    nama: String!
    username: String!
    password: String
    email: String!
    jabatan: Jabatan!
  }

  type Jabatan {
    _id: ID!
    nama: String!
    karyawan: [Karyawan!]!
  }

  type Cart {
    _id: ID!
    cartKode: String!
    total: Float!
    barang: [CartDetail!]!
    kasir: Karyawan!
    pelanggan: Pelanggan!
    createdAt: String!
    updatedAt: String!
  }

  type CartDetail {
    _id: ID!
    cartKode: Cart!
    barang: Barang!
    quantity: Int!
    harga: Float!
  }

  type Satuan {
    _id: ID!
    nama: String!
    barang: [Barang!]!
  }

  type Kategori {
    _id: ID!
    nama: String!
    barang: [Barang!]!
  }

  type Pelanggan{
    _id: ID!
    nama: String!
    alamat: String!
    telepon: String!
    listOrder: [Cart!]!
  }
  
  # Input
  input BarangInput {
    nama: String!
    brand: String!
    stok: Int!
    hargaBeli: Float!
    hargaJual: Float!
    createdAt: String!
    updatedAt: String!
  }

  input SatuanInput {
    nama: String!
  }

  input KategoriInput {
    nama: String!
  }

  input SupplierInput {
    nama: String!
    telepon: String!
    alamat: String!
  }

  input KaryawanInput {
    nama: String!
    username: String!
    email: String
    password: String
  }

  input JabatanInput {
    nama: String!
    level: Int!
  }

  input CartInput {
    cartKode: String!
    total: Float!
    createdAt: String!
    updatedAt: String!
  }

  input CartDetailInput {
    quantity: Int!
    harga: Float!
  }

  input PelangganInput {
    nama: String!
    telepon: String!
    alamat: String!
  }

`)