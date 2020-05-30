import React, { Component } from "react";
import { Container, Header, Segment, Input } from "semantic-ui-react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import { publicAPI } from "@root/api/publicAPI";
import { AnimalData } from "@root/constants/interface";

@observer
export default class HomePage extends Component {
  @observable inputValue = "410100009983225";

  @observable animalData?: AnimalData;

  onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.inputValue = e.target.value;
  };

  getAnimalData = () => {
    publicAPI.getAnimalData(this.inputValue).then((data) => {
      this.animalData = { ...data };
    });
  };

  render() {
    return (
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: "1200px", padding: "1em 0em" }}
        vertical
      >
        <Container text>
          <Header
            as="h3"
            content="동물 등록 번호 조회"
            inverted
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "3em",
            }}
          />
          <Input
            style={{
              width: "31rem",
              marginTop: "3em",
            }}
            action={{
              color: "teal",
              icon: "search",
              circular: true,
              onClick: this.getAnimalData,
            }}
            placeholder="Search..."
            value={this.inputValue}
            onChange={this.onChangeValue}
          />
        </Container>
        {this.animalData === undefined ? (
          <></>
        ) : (
          <>
            <div>{this.animalData.animalNumber}</div>
            <div>{this.animalData.genderType}</div>
            <div>{this.animalData.kind}</div>
            <div>{this.animalData.name}</div>
          </>
        )}
      </Segment>
    );
  }
}
