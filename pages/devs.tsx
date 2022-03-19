import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { config } from "process";
import React, { useEffect, useState, useRef } from "react";
import Button from "../components/Button/Button";
import { Modal } from "../components/Modal/Modal";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Devs.module.css";
import { appURL } from "./_app";

type Props = {};

export interface IDevs {
  id: string;
  Avatar?: string;
  Nome: string;
  Carreira: string;
  Github: string;
  Linkedin: string;
}

const Devs: React.FC = (props: Props) => {
  const requestURL = appURL + "/api/v1/dev";
  const carousel = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [devData, setDevData] = useState<IDevs[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddDevModalOpen, setIsAddDevModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number>(-1);
  const [addModalData, setAddModalData] = useState({
    Avatar: "",
    Nome: "",
    Carreira: "",
    Github: "",
    Linkedin: "",
  });
  const [modalData, setModalData] = useState<IDevs>({
    id: "",
    Avatar: "",
    Nome: "",
    Carreira: "",
    Github: "",
    Linkedin: "",
  });

  const handleRightClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft += carousel.current.offsetWidth / 1.5;
    }
  };
  const handleLeftClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (carousel.current) {
      carousel.current.scrollLeft -= carousel.current.offsetWidth / 1.5;
    }
  };
  const toggleAddDevModal = () => {
    setIsAddDevModalOpen(true);
  };
  const toggleDeleteModal = (event: React.SyntheticEvent) => {
    let index_str = event.currentTarget.getAttribute("child-key");
    let index =
      index_str === null ? -1 : index_str === "" ? -1 : parseInt(index_str);
    if (index >= 0) {
      setModalData(devData[index]);
      setIsDeleteModalOpen(!isDeleteModalOpen);
      setModalIndex(index);
    }
  };
  const toggleEditModal = (event: React.SyntheticEvent) => {
    let index_str = event.currentTarget.getAttribute("child-key");
    let index =
      index_str === null ? -1 : index_str === "" ? -1 : parseInt(index_str);
    if (index >= 0) {
      setModalData(devData[index]);
      setIsEditModalOpen(!isEditModalOpen);
      setModalIndex(index);
    }
  };

  const handleSubmitNewDev = () => {
    setIsLoading(true);
    axios
      .post(requestURL, addModalData)
      .then((response) => response.status)
      .then((status) => {
        if (status === 201) {
          axios
            .get(requestURL)
            .then((resp) => resp.data)
            .then((data) => data.devs)
            .then((devs: IDevs[]) => {
              setDevData(devs);
            })
            .then(() => {
              setIsLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

    setAddModalData({
      Avatar: "",
      Nome: "",
      Carreira: "",
      Github: "",
      Linkedin: "",
    });
    setIsAddDevModalOpen(!isAddDevModalOpen);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(requestURL)
      .then((response) => response.data)
      .then((data) => data.devs)
      .then((devs: IDevs[]) => {
        setDevData(devs);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [requestURL]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    console.log("executed handle submit");
    setIsLoading(true);
    setIsEditModalOpen(!isEditModalOpen);
    let new_devs = devData;
    new_devs[modalIndex] = modalData;
    axios
      .put(requestURL, modalData)
      .then((response: AxiosResponse) => {
        if (response.status === 201) {
          setDevData(new_devs);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const handleDelete = (event: React.SyntheticEvent) => {
    console.log("executed deletion");
    setIsLoading(true);
    const devId = devData[modalIndex].id;
    setIsDeleteModalOpen(!isDeleteModalOpen);

    axios
      .delete(requestURL, {
        data: {
          id: devId,
        },
      })
      .then((response) => {
        if (response.status === 202) {
          let new_devs = devData;
          new_devs.splice(modalIndex, 1);
          setDevData(new_devs);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <Navbar>
          <div className={styles.btnContainer}>
            <button
              onClick={(e) => toggleAddDevModal()}
              className={styles.searchBtn}
            >
              Cadastrar Dev
            </button>
          </div>
        </Navbar>
        <div className={styles.mainContentContainer}>
          <FontAwesomeIcon
            onClick={handleLeftClick}
            icon={faArrowAltCircleLeft}
            className={styles.icons}
            size="2x"
            color="#f5f5f5"
          />
          <div className={styles.mainContent} ref={carousel}>
            {isLoading ? (
              <div className={styles.loading}></div>
            ) : (
              devData.map((dev: IDevs, index: number) => {
                const avatarSrc = dev.Avatar
                  ? dev.Avatar
                  : "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png";

                return (
                  <div className={styles.carouselItem} key={index}>
                    <div className={styles.card}>
                      <div className={styles.avatar}>
                        <Image
                          width="175px"
                          height="175px"
                          src={avatarSrc}
                          alt={`Profile avatar of dev named ${dev.Nome}`}
                        />
                      </div>
                      <div className={styles.greenBar}>______________</div>
                      <h5 className={styles.name}>{dev.Nome}</h5>
                      <p className={styles.description}>{dev.Carreira}</p>
                      <div className={styles.actionContent}>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`https://linkedin.com/in/${dev.Linkedin}`}
                        >
                          <FontAwesomeIcon
                            icon={faLinkedin}
                            size="3x"
                            color="#f5f5f5"
                            className={styles.icons}
                          />
                        </a>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`https://github.com/${dev.Github}`}
                        >
                          <FontAwesomeIcon
                            className={styles.icons}
                            icon={faGithub}
                            size="3x"
                            color="#f5f5f5"
                          />
                        </a>
                        <div>
                          <Button
                            displaytext="Ver perfil"
                            fontSize="md"
                            showAfter={false}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.actionBtnContainer}>
                      <button
                        child-key={index}
                        onClick={(event) => toggleEditModal(event)}
                        className={styles.editBtn}
                      >
                        Editar
                      </button>
                      <button
                        child-key={index}
                        onClick={(event) => toggleDeleteModal(event)}
                        className={styles.deleteBtn}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <FontAwesomeIcon
            onClick={handleRightClick}
            icon={faArrowAltCircleRight}
            className={styles.icons}
            size="2x"
            color="#f5f5f5"
          />
        </div>
      </div>
      <div>
        {/* EDIT MODAL */}
        <Modal isShown={isEditModalOpen} hide={toggleEditModal}>
          <div className={styles.modalTitle}>
            <div>Editar Dev</div>
          </div>
          <div className={styles.modalContent}>
            <form
              // action="submit"
              // onSubmit={(e) => saveEditData(e)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className={styles.formInputContainer}>
                <div className={styles.label}>Nome:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="nameInput"
                  value={modalData.Nome}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      Nome: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInputContainer}>
                <div className={styles.label}>Avatar:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="avatarInput"
                  value={modalData.Avatar}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      Avatar: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInputContainer}>
                <div className={styles.label}>Carreira:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="Carreira"
                  value={modalData.Carreira}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      Carreira: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInputContainer}>
                <div className={styles.label}>Github:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="github"
                  value={modalData.Github}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      Github: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInputContainer}>
                <div className={styles.label}>LinkedIn:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="linkedIn"
                  value={modalData.Linkedin}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      Linkedin: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </div>
          <div className={styles.actionBtnContainer}>
            <button
              onClick={() => setIsEditModalOpen(!isEditModalOpen)}
              className={styles.cancelBtn}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              onClick={(e) => handleSubmit(e)}
            >
              Salvar
            </button>
          </div>
        </Modal>
        {/* ADD DEV MODAL */}
        <Modal isShown={isAddDevModalOpen} hide={toggleAddDevModal}>
          <div className={styles.modalTitle}>
            <div>Adicionar Dev</div>
          </div>
          <div className={styles.modalContent}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className={styles.formInputContainer}>
                <div className={styles.label}>Nome:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="nameInput"
                  value={addModalData.Nome}
                  onChange={(e) =>
                    setAddModalData({
                      ...addModalData,
                      Nome: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInputContainer}>
                <div className={styles.label}>Avatar:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="avatarInput"
                  value={addModalData.Avatar}
                  onChange={(e) =>
                    setAddModalData({
                      ...addModalData,
                      Avatar: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInputContainer}>
                <div className={styles.label}>Carreira:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="Carreira"
                  value={addModalData.Carreira}
                  onChange={(e) =>
                    setAddModalData({
                      ...addModalData,
                      Carreira: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInputContainer}>
                <div className={styles.label}>Github:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="github"
                  value={addModalData.Github}
                  onChange={(e) =>
                    setAddModalData({
                      ...addModalData,
                      Github: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formInputContainer}>
                <div className={styles.label}>LinkedIn:</div>
                <input
                  className={styles.editInputs}
                  type="text"
                  name="linkedIn"
                  value={addModalData.Linkedin}
                  onChange={(e) =>
                    setAddModalData({
                      ...addModalData,
                      Linkedin: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </div>
          <div className={styles.actionBtnContainer}>
            <button
              onClick={() => setIsAddDevModalOpen(!isAddDevModalOpen)}
              className={styles.cancelBtn}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              onClick={(e) => handleSubmitNewDev()}
            >
              Adicionar
            </button>
          </div>
        </Modal>
        {/* DELETE MODAL */}
        <Modal isShown={isDeleteModalOpen} hide={(e) => toggleDeleteModal(e)}>
          <div className={styles.modalTitle}>
            <div>Excluir Dev</div>
          </div>
          <div className={styles.modalContent}>
            Tem certeza que deseja excluir este Dev do banco de dados?
          </div>
          <div className={styles.actionBtnContainer}>
            <button
              onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
              className={styles.cancelBtn}
            >
              Cancelar
            </button>
            <button
              onClick={(e) => handleDelete(e)}
              className={styles.deleteBtn}
            >
              Excluir
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Devs;
