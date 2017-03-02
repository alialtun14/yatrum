import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Trip } from '../../../../models/trip';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../reducers/index';
import { FollowUserAction } from '../../../../actions/user.action';
import { LikeTripAction } from '../../../../actions/trips.action';
import { UserProfile } from '../../../../models/user-profile';
import { ServerAuthService } from './../../../../services/server-auth.service';

@Component({
  selector: 'tr-trip-detail-header',
  templateUrl: './trip-detail-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./trip-detail-header.component.scss']
})
export class TripDetailHeaderComponent implements OnInit {
  @Input() trip: Trip;
  @Input() tripUser: UserProfile;
  @Input() url: string;
  constructor(
    private store: Store<fromRoot.State>,
    private serverAuth: ServerAuthService
  ) { }

  ngOnInit() {
  }

  tripFollowState() {
    if (!this.trip) return 'inactive';
    return this.trip.user.is_followed_by_current_user ? 'active' : 'inactive';
  }
  tripLikeState() {
    if (!this.trip) return 'inactive';
    return this.trip.is_liked_by_current_user ? 'active' : 'inactive';
  }

  onToggleFollow() {
    this.store.dispatch(new FollowUserAction(this.trip.user_id))
  }  

  onToggleLike() {
    this.store.dispatch(new LikeTripAction(this.trip.id));
  }

  belongsToLoggedInUser() {
    return this.serverAuth.belongsToLoggedInUser(this.tripUser.id)
  }

  formatImageUrl(rawUrl) {
    if(!rawUrl) return;

    let sizeFormatString = '/c_limit,q_65,w_900';
    let splitUrlArray = rawUrl.split('/upload')
    let firstPart = splitUrlArray[0] + '/upload';
    let seconPart = sizeFormatString + splitUrlArray[1];
    return `${firstPart}${seconPart}`;
  }

}
