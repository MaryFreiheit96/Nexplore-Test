import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col } from "antd";
import Card from "antd/es/card/Card";
import { Duty } from "../models/Duty";
import { DutyService } from "../services/DutyService";

export function DutyComponent({ Id, Name }: { Id: string; Name: string }) {
  const duty = new Duty(Id, Name);
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
              onClick={(e) => {
                editDuty(duty.id, duty.name);
              }}
            />
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
}

function editDuty(id: string, name: string) {
  return DutyService.editDuty(id, name);
}

function deleteDuty(id: string) {
  return DutyService.deleteDuty(id);
}
