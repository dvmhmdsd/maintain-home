import CoreService from "../core.service";
import Feedback from "../../data-access-layer/feedback/feedback.model";
import { IFeedback } from './../../CONSTANTS/interfaces/feedback.interface';

export default class FeedbackService extends CoreService<IFeedback> {
  constructor() {
    super();
    this.initialize(Feedback, "Feedback");
  }
}
