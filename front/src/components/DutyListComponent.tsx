import { Duty } from "../models/Duty";
import { Button, Col, Divider, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Input from "rc-input";
import { DutyService } from "../services/DutyService";
import Card from "antd/es/card/Card";

export function DutyListComponent() {
  const [dutyList, setDutyList] = useState(null);

  useEffect(() => {
    async function getDutyList() {
      await DutyService.geAllDuties();
      const duties = await DutyService.geAllDuties();
      setDutyList(duties);
    }
    if (!dutyList) getDutyList();
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [idCreateModal, setIdCreateModal] = useState("");
  const [nameCreateModal, setNameCreateModal] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [idEditModal, setIdEditModal] = useState("");
  const [nameEditModal, setNameEditModal] = useState("");

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const showEditModal = (id: string, name: string) => {
    setIdEditModal(id);
    setNameEditModal(name);
    setIsEditModalOpen(true);
  };

  const handleCreateModalOk = async () => {
    const duty = {
      id: idCreateModal,
      name: nameCreateModal,
    };
    setIdCreateModal("");
    setNameCreateModal("");
    await DutyService.createDuty(duty);
    setIsCreateModalOpen(false);
    const duties = await DutyService.geAllDuties();
    setDutyList(duties);
  };

  const handleEditModalOk = async () => {
    await DutyService.editDuty(idEditModal, nameEditModal);
    setIdEditModal("");
    setNameEditModal("");
    setIsEditModalOpen(false);
    const duties = await DutyService.geAllDuties();
    setDutyList(duties);
  };

  const handleCancelCreateDuty = () => {
    setIsCreateModalOpen(false);
  };

  const handleCancelEditDuty = () => {
    setIsEditModalOpen(false);
  };

  const deleteDuty = async (id: string) => {
    await DutyService.deleteDuty(id);
    const duties = await DutyService.geAllDuties();
    setDutyList(duties);
  };

  return (
    <div>
      <h1 className="title">Duties</h1>
      <Divider />
      <div>
        <Button
          className="addCard"
          type="primary"
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Add New Duty
        </Button>
        <Modal
          title="Create New Duty"
          open={isCreateModalOpen}
          onOk={handleCreateModalOk}
          onCancel={handleCancelCreateDuty}
        >
          <div>
            <Input
              id="Id"
              placeholder="Id"
              value={idCreateModal}
              onChange={(e) => setIdCreateModal(e.target.value)}
            />
            <Input
              id="Name"
              placeholder="Name"
              value={nameCreateModal}
              onChange={(e) => setNameCreateModal(e.target.value)}
            />
          </div>
        </Modal>
      </div>
      <Divider />

      <div className="site-card-wrapper">
        <Row className="cardsContainer" gutter={16}>
          {(dutyList ?? []).map((duty: Duty) => {
            const cardTitle = `Duty Id: ${duty.id}`;
            return (
              <Col className="cardCol" span={6}>
                <Card
                  title={cardTitle}
                  bordered={true}
                  extra={
                    <div>
                      <Button
                        className="editButton"
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={(e) => showEditModal(duty.id, duty.name)}
                      />
                      <Modal
                        title="Edit Duty"
                        open={isEditModalOpen}
                        onOk={handleEditModalOk}
                        onCancel={handleCancelEditDuty}
                      >
                        <div>
                          <Input
                            id="Id"
                            placeholder="Id"
                            value={idEditModal}
                            onChange={(e) => setIdEditModal(e.target.value)}
                            disabled
                          />
                          <Input
                            id="Name"
                            placeholder="Name"
                            value={nameEditModal}
                            onChange={(e) => setNameEditModal(e.target.value)}
                          />
                        </div>
                      </Modal>
                      <Button
                        className="deleteButton"
                        type="primary"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                          deleteDuty(duty.id);
                        }}
                      />
                    </div>
                  }
                >
                  Name: {duty.name}
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
