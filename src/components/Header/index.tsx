import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changesearchedName,
  clearProducts,
  removeProduct
} from "../../actions";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "../../components/Modal";
import { AiOutlineClose } from "react-icons/ai";

import {
  Container,
  Logo,
  CartButton,
  SearchBar,
  SearchInput,
  SearchBarButton,
  SearchBarButtonIcon,
  CartIcon,
  CartAside,
  CartAsideInfo,
  EmptyCart,
  FinishPurchaseButton,
  RemoveIcon,
  CartContainer,
  SearchBarMobile,
  SearchBarMobileContainer,
  MenuButton,
  MenuIcon
} from "./styles";

import pokemonLogo from "../../assets/pokemon-logo.png";

interface IProps {
  type: string;
}

interface Inputs {
  searchedName: string;
}

interface Pokemon {
  id: string;
  name: string;
  url: string;
  price: number;
  amount: number;
  storeType?: string;
}

interface Store {
  productsState: { products: Pokemon[] };
  cartState: { cartState: boolean };
}

const stores: { [key: string]: any } = {
  fire: "fogo",
  water: "agua",
  grass: "grama"
};

function getTotalAmount(products: Pokemon[], type: string): number {
  return products
    .filter((product: Pokemon) => product.storeType === type)
    .reduce((a, b) => a + b.amount, 0);
}

function getTotalValue(products: Pokemon[], type: string): number {
  return products
    .filter((product: Pokemon) => product.storeType === type)
    .reduce((a, b) => a + b.price * b.amount, 0);
}

const Header: React.FC<IProps> = ({ type }) => {
  const products = useSelector((store: Store) => store.productsState.products);
  const productsLength = products.filter(
    (product: Pokemon) => product.storeType === type
  ).length;
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { push } = useHistory();
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [lastTotalValue, setLastTotalValue] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mobileFormOpen, setMobileFormOpen] = useState<boolean>(false);

  useEffect(() => {
    setTotalValue(getTotalValue(products, type));
    setTotalAmount(getTotalAmount(products, type));
  }, [products, type]);

  const onSubmit = (data: Inputs) => {
    const { searchedName } = data;
    dispatch(changesearchedName(searchedName));
    reset();
    push(`/store/${stores[type]}`);
  };

  const toggle = () => {
    setCartIsOpen(!cartIsOpen);
  };

  const toggleModal = () => {
    if (totalValue > 0) {
      setLastTotalValue(totalValue);
      setIsOpen(!isOpen);
      dispatch(clearProducts());
      setCartIsOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <React.Fragment>
      <Container type={type}>
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <div className="modalContent">
            <div>Obrigado por finalizar sua compra!</div>
            <div>Valor total: R$ {lastTotalValue},00 :)</div>
            <span className="buttonCloseModal" onClick={toggleModal}>
              <AiOutlineClose style={{ color: "#fff" }} />
            </span>
          </div>
        </Modal>
        <div className="wrapper">
          <MenuButton onClick={() => setMobileFormOpen(!mobileFormOpen)}>
            <MenuIcon />
          </MenuButton>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo logoUrl={pokemonLogo}>
              <div />
              <span>STORE</span>
            </Logo>
          </Link>
          <SearchBar onSubmit={handleSubmit(onSubmit)}>
            <SearchInput
              name="searchedName"
              defaultValue=""
              placeholder="Pesquisar..."
              ref={register}
            />
            <SearchBarButton type="submit">
              <SearchBarButtonIcon iconcolortype={type} />
            </SearchBarButton>
          </SearchBar>
          <CartButton
            title="Pokemon Selecionados"
            iconcolortype={type}
            onClick={toggle}
          >
            <CartIcon /> {productsLength > 0 && <span>{productsLength}</span>}
          </CartButton>
        </div>
      </Container>
      {mobileFormOpen && (
        <SearchBarMobileContainer type={type}>
          <SearchBarMobile onSubmit={handleSubmit(onSubmit)}>
            <SearchInput
              id="mobileVersion"
              name="searchedName"
              defaultValue=""
              placeholder="Pesquisar..."
              ref={register}
            />
            <SearchBarButton type="submit">
              <SearchBarButtonIcon iconcolortype={type} />
            </SearchBarButton>
          </SearchBarMobile>
        </SearchBarMobileContainer>
      )}
      {cartIsOpen && (
        <React.Fragment>
          <CartAside onClick={toggle} />
          <CartContainer className="cartContainer">
            <span className="cartTitle">Pokemon adicionados</span>
            <div className="cartContainerWrapper">
              {products &&
              products.filter((product: Pokemon) => product.storeType === type)
                .length > 0 ? (
                products
                  .filter((product: Pokemon) => product.storeType === type)
                  .map((product: Pokemon) => (
                    <CartAsideInfo pokemonId={product.id} key={product.id}>
                      <div>
                        <span className="productName">
                          <div className="productImage" />
                          <div>{product.name}</div>
                        </span>
                        <span className="productPrice">
                          R$ {product.price * product.amount}
                          ,00
                        </span>
                      </div>
                      <div>
                        <span> Quantidade: {product.amount}</span>
                        <button
                          title="Remover"
                          onClick={() =>
                            dispatch(
                              removeProduct({
                                ...product,
                                price: product.price,
                                storeType: type
                              })
                            )
                          }
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    </CartAsideInfo>
                  ))
              ) : (
                <EmptyCart>Você não possui nenhum Pokemon adicionado</EmptyCart>
              )}
            </div>
            {totalValue > 0 && (
              <React.Fragment>
                <span className="cartTotalPrice">
                  <span>Items: {totalAmount}</span>
                  <span>Total: R$ {totalValue},00</span>
                </span>
                <FinishPurchaseButton storeType={type} onClick={toggleModal}>
                  Finalizar
                </FinishPurchaseButton>
              </React.Fragment>
            )}
          </CartContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Header;
