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
    order: [Order!]!
    satuan: [Satuan!]!
    kategori: [Kategori!]!
    pelanggan: [Pelanggan!]!
    login(username: String!, password: String!): AuthData!
  }

  type RootMutation {
    # Barang
    addBarang(input: BarangInput!, satuan: SatuanInput!, kategori: KategoriInput!): Barang
    updateBarang(id: ID!, input: BarangInput!, satuan: SatuanInput, kategori: KategoriInput): Barang
    deleteBarang(id: ID!): String

    # Kategori
    addKategori(input: KategoriInput!): Kategori
    updateKategori(id: ID!, input: KategoriInput!): Kategori
    deleteKategori(id: ID!): String
    
    # Satuan
    addSatuan(input: SatuanInput!): Satuan
    updateSatuan(id: ID!, input: SatuanInput!): Satuan
    deleteSatuan(id: ID!): String
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExp: Int!
  }

  type Barang {
    _id: ID!
    nama: String!
    brand: String!
    stok: Int!
    satuan: Satuan!
    kategori: Kategori!
    hargaBeli: Float!
    hargaJual: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Supplier {
    _id: ID!
    nama: String!
    telepon: String!
    alamat: String!
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
  }

  type Cart {
    _id: ID!
    cartKode: String!
    createdAt: String!
    updatedAt: String!
    total: Float!
    barang: [Barang!]!
  }

  type Order {
    _id: ID!
    cartKode: String!
    createdAt: String!
    updatedAt: String!
    total: Float!
    barang: [Barang!]!
  }

  type Satuan {
    _id: ID!
    nama: String!
  }

  type Kategori {
    _id: ID!
    nama: String!
  }

  type Pelanggan{
    _id: ID!
    nama: String!
    alamat: String!
    telepon: String!
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

`)