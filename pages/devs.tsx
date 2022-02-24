import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { type } from "os";
import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import { Modal } from "../components/Modal/Modal";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Devs.module.css";

type Props = {};

export interface Devs {
  avatarLink?: string;
  fullName: string;
  techCareer: string;
  githubLink: string;
  linkedinLink: string;
}

const devs = (props: Props) => {
  const [devData, setDevData] = useState<Devs[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState<number>(-1);
  const [modalData, setModalData] = useState<Devs>({
    avatarLink: "",
    fullName: "",
    techCareer: "",
    githubLink: "",
    linkedinLink: "",
  });

  const toggleDeleteModal = (event: React.SyntheticEvent) => {
    let index_str = event.currentTarget.getAttribute("child-key");
    let index =
      index_str === null ? -1 : index_str === "" ? -1 : parseInt(index_str);
    if (index >= 0) {
      setModalData(devData[index]);
      setIsDeleteModalOpen(!isDeleteModalOpen);
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

  const dummyData = [
    {
      fullName: "Ricardo Martins",
      githubLink: "ricardobohadana",
      linkedinLink: "ricardobohadana",
      techCareer: "Data Scientist",
    },
    {
      fullName: "Ricardo Martins",
      githubLink: "ricardobohadana",
      linkedinLink: "ricardobohadana",
      techCareer: "Software Engineer",
    },
    {
      fullName: "Ricardo Martins",
      githubLink: "ricardobohadana",
      linkedinLink: "ricardobohadana",
      techCareer: "Software Developer",
    },
  ];
  useEffect(() => {
    setDevData(dummyData);
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    console.log("executed handle submit");
    let new_devs = devData;
    new_devs[modalIndex] = modalData;
    console.log(new_devs);
    setDevData(new_devs);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleDelete = (event: React.SyntheticEvent) => {
    console.log("executed deletion");
    console.log(modalIndex);
    let new_devs = devData;
    new_devs.splice(modalIndex, 1);

    setDevData(new_devs);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <div className={styles.container}>
      <Navbar showSearchButton={true} />
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
                value={modalData.fullName}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    fullName: e.target.value,
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
                value={modalData.avatarLink}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    avatarLink: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formInputContainer}>
              <div className={styles.label}>Carreira:</div>
              <input
                className={styles.editInputs}
                type="text"
                name="techCareer"
                value={modalData.techCareer}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    techCareer: e.target.value,
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
                value={modalData.githubLink}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    githubLink: e.target.value,
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
                value={modalData.linkedinLink}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    linkedinLink: e.target.value,
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
          <button onClick={(e) => handleDelete(e)} className={styles.deleteBtn}>
            Excluir
          </button>
        </div>
      </Modal>
      <div className={styles.mainContent}>
        {devData.length == 0 ? (
          <div style={{ color: "#f9f9f9" }}>
            Não há Devs cadastrados em nosso banco de dados
          </div>
        ) : (
          devData.map((dev: Devs, index: number) => {
            const avatarSrc = dev.avatarLink
              ? dev.avatarLink
              : "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png";

            return (
              <div>
                <div className={styles.card}>
                  <div className={styles.avatar}>
                    <Image width="175px" height="175px" src={avatarSrc} />
                  </div>
                  <div className={styles.greenBar}>______________</div>
                  <h5 className={styles.name}>{dev.fullName}</h5>
                  <p className={styles.description}>{dev.techCareer}</p>
                  <div className={styles.actionContent}>
                    <a
                      target="_blank"
                      href={`https://linkedin.com/in/${dev.linkedinLink}`}
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
                      href={`https://github.com/${dev.githubLink}`}
                    >
                      <FontAwesomeIcon
                        className={styles.icons}
                        icon={faGithub}
                        size="3x"
                        color="#f5f5f5"
                        target="_blank"
                      />
                    </a>
                    <div>
                      <Button
                        displaytext="Ver perfil"
                        fontSize="md"
                        showafter={false}
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
    </div>
  );
};

export default devs;
