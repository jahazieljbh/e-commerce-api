import mongoose from "mongoose";
import Address from "../models/Address.js";
import User from "../models/User.js";

// Controlador para crear una dirección
export const createAddress = async (req, res) => {
  const { addressName, addressLine1, addressLine2, city, state, country, zipcode } = req.body;

  if (!addressName) {
    return res
      .status(400)
      .json({ message: "El nombre de la dirección es obligatorio" });
  }

  if (!addressLine1) {
    return res
      .status(400)
      .json({ message: "La dirección es obligatoria" });
  }

  if (!city) {
    return res
      .status(400)
      .json({ message: "La ciudad es obligatoria" });
  }

  if (!state) {
    return res
      .status(400)
      .json({ message: "El estado es obligatorio" });
  }

  if (!country) {
    return res
      .status(400)
      .json({ message: "El país es obligatorio" });
  }

  if (!zipcode) {
    return res
      .status(400)
      .json({ message: "El código postal es obligatorio" });
  }

  try {
    const user = req.user._id;
    const userExists = await User.findById(user);
    const addresses = await Address.find({ user: user });

    if (addresses.some((address) => address.addressName === addressName)) {
      return res
        .status(409)
        .json({ message: "Ya tienes una direccion registrada con ese nombre" });
    }

    if (addresses.length > 0) {
      await Address.updateMany({ user: user }, { isDefault: false });
    }

    const addressData = {
      user: userExists._id,
      addressName,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zipcode,
      isDefault: true
    };

    const address = await Address.create(addressData);

    userExists.addresses.push(address);

    await userExists.save();

    return res.status(201).json({ success: true, message: "Dirección creada exitosamente", address: address });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para establecer dirección por defecto
export const setDefaultAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const user = req.user._id;

    // Obtener la dirección a actualizar
    const address = await Address.findById(addressId);

    // Verificar si el usuario que realiza la petición es el dueño de la dirección
    if (!address.user.equals(user)) {
      return res.status(401).json({ message: "No tienes permiso para establecer esta dirección por defecto" });
    }

    // Establecer todas las direcciones como no predeterminadas
    await Address.updateMany({ user: user }, { isDefault: false });

    // Establecer la dirección seleccionada como predeterminada
    address.isDefault = true;

    await address.save();

    return res.status(200).json({ success: true, message: "Dirección establecida por defecto exitosamente", address: address });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para eliminar una dirección // falta reparar
export const deleteAddressById = async (req, res) => {
  const addressId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !addressId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const addressExists = await Address.findById(addressId);
    if (!addressExists) {
      return res.status(404).json({ message: "Dirección no existe" });
    }

    if (addressExists.isDefault) {
      return res.status(409).json({ message: "No se puede eliminar la dirección predeterminada" });
    }

    const user = req.user._id;
    const userExists = await User.findById(user);

    if (!addressExists.user.equals(user)) {
      return res
        .status(401)
        .json({
          message:
            "No tienes permiso para eliminar esta dirección",
        });
    }
    
    userExists.addresses.remove(addressExists._id);

    userExists.save();

    await addressExists.deleteOne({ _id: addressId });

    return res
      .status(200)
      .json({ success: true, message: "Dirección eliminada exitosamente" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para actualizar una dirección
export const updateAddressById = async (req, res) => {
  const addressId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !addressId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  const { addressName, addressLine1, addressLine2, city, state, country, zipcode } = req.body;

  if (!addressName) {
    return res
      .status(400)
      .json({ message: "El nombre de la dirección es obligatorio" });
  }

  if (!addressLine1) {
    return res
      .status(400)
      .json({ message: "La dirección es obligatoria" });
  }

  if (!city) {
    return res
      .status(400)
      .json({ message: "La ciudad es obligatoria" });
  }

  if (!state) {
    return res
      .status(400)
      .json({ message: "El estado es obligatorio" });
  }

  if (!country) {
    return res
      .status(400)
      .json({ message: "El país es obligatorio" });
  }

  if (!zipcode) {
    return res
      .status(400)
      .json({ message: "El código postal es obligatorio" });
  }

  try {
    const user = req.user._id;
    const address = await Address.findById(addressId);

    if (!address) {
      return res
        .status(404)
        .json({ message: "No se encontró la dirección" });
    }

    if (!address.user.equals(user)) {
      return res
        .status(401)
        .json({
          message:
            "No tienes permiso para modificar esta dirección",
        });
    }

    const addresses = await Address.find({ user: user });

    if (!addresses || addresses.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron direcciones para este usuario" });
    }

    if (addresses.some((address) => address.addressName === addressName)) {
      return res
        .status(409)
        .json({ message: "Ya tienes una direccion registrada con ese nombre" });
    }

    const addressData = { 
      addressName,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zipcode,
    }

    const updateAddress = await address.updateOne(addressData);

    return res.status(200).json({ success: true, message: "Dirección actualizada exitosamente", address: updateAddress });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para obtener todas las direcciones
export const getAllAddresses = async (req, res) => {
  try {
    const user = req.user._id;
    const addresses = await Address.find({ user: user });

    if (!addresses || addresses.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay direcciones disponibles para este usuario" });
    }

    return res.status(200).json({
      success: true,
      count: addresses.length,
      addresses: addresses,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para obtener una dirección por ID
export const getAddressById = async (req, res) => {
  const addressId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !addressId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }
  
  try {
    const user = req.user._id;
    const address = await Address.findById(addressId);

    if (!address.user.equals(user)) {
      return res.status(401).json({ message: "No tienes permiso para ver este dirección" });
    }

    if (!address) {
      return res.status(404).json({ message: "Dirección no encontrada" });
    }

    return res.status(200).json({ success: true, address: address });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
