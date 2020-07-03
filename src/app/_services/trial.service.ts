import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class TrialService{
    trial = new Subject<any>();

    public openTrialSet(trialExpired) {
        this.trial.next({trialExpired: trialExpired});
    }

    public openTrialGet(): Observable<any> {
        return this.trial.asObservable();
    }
}
