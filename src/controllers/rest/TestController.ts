import {BodyParams, Controller, Post} from "@tsed/common";
import {MergeParams} from "@tsed/platform-express";
import {CollectionOf, Required, Returns} from "@tsed/schema";
import {OnDeserialize} from "@tsed/json-mapper";

export class CustomModel {
  @CollectionOf(String)
  @OnDeserialize(features => {
    console.log("features:", features);
    return features;
  })
  features: string[];
  @CollectionOf(String)
  @OnDeserialize(filters => {
    console.log("filters:", filters);
    return filters;
  })
  filters: string[];
}


@Controller("/test")
@MergeParams()
export class TestDeserializeCtrl {
  @Post("/")
  @Returns(200, CustomModel)
  async post(@Required() @BodyParams() options: CustomModel) {
    return options;
  }
}
