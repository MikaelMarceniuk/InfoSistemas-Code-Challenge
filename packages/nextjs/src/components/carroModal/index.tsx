import { ChangeEvent, useEffect, useRef, useState } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { ICarro } from "../../types"

interface IProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: ICarro) => void
  onDelete: (carroId: string) => void
  selectedCarro?: ICarro
}

const emptyValues = {
  _id: "",
  ano: "",
  chassi: "",
  marca: "",
  modelo: "",
  placa: "",
  renavam: "",
}

const CarroModal: React.FC<IProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  selectedCarro,
}) => {
  const [values, setValues] = useState<ICarro>(emptyValues)
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  useEffect(() => {
    setValues(() => {
      if (!selectedCarro) return emptyValues

      return {
        _id: selectedCarro._id,
        ano: selectedCarro.ano,
        chassi: selectedCarro.chassi,
        marca: selectedCarro.marca,
        modelo: selectedCarro.modelo,
        placa: selectedCarro.placa,
        renavam: selectedCarro.renavam,
      }
    })
  }, [selectedCarro])

  const handleOnChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setValues((oldVal) => ({ ...oldVal, [key]: e.target.value }))

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedCarro ? "Atualizar" : "Criar"} um carro
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Marca</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Digite a marca"
              disabled={Boolean(selectedCarro)}
              value={values.marca}
              onChange={handleOnChange("marca")}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Modelo</FormLabel>
            <Input
              placeholder="Digite o modelo"
              disabled={Boolean(selectedCarro)}
              value={values.modelo}
              onChange={handleOnChange("modelo")}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Ano</FormLabel>
            <Input
              placeholder="Digite o ano"
              disabled={Boolean(selectedCarro)}
              type="number"
              value={values.ano}
              onChange={handleOnChange("ano")}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Placa</FormLabel>
            <Input
              placeholder="Digite a placa"
              value={values.placa}
              onChange={handleOnChange("placa")}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Chassi</FormLabel>
            <Input
              placeholder="Digite o chassi"
              disabled={Boolean(selectedCarro)}
              value={values.chassi}
              onChange={handleOnChange("chassi")}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Renavam</FormLabel>
            <Input
              placeholder="Digite a renava"
              disabled={Boolean(selectedCarro)}
              value={values.renavam}
              onChange={handleOnChange("renavam")}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => onSubmit(values)}>
            {selectedCarro ? "Atualizar" : "Criar"}
          </Button>
          {selectedCarro && (
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => onDelete(values._id)}
            >
              Apagar
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CarroModal
