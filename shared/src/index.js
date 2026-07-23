"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionStatus = exports.SubscriptionTier = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["FREE_USER"] = "FREE_USER";
    UserRole["PREMIUM_USER"] = "PREMIUM_USER";
    UserRole["ARTIST"] = "ARTIST";
    UserRole["MODERATOR"] = "MODERATOR";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var SubscriptionTier;
(function (SubscriptionTier) {
    SubscriptionTier["FREE"] = "FREE";
    SubscriptionTier["INDIVIDUAL_MONTHLY"] = "INDIVIDUAL_MONTHLY";
    SubscriptionTier["INDIVIDUAL_YEARLY"] = "INDIVIDUAL_YEARLY";
    SubscriptionTier["FAMILY"] = "FAMILY";
})(SubscriptionTier || (exports.SubscriptionTier = SubscriptionTier = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["INACTIVE"] = "INACTIVE";
    SubscriptionStatus["ACTIVE"] = "ACTIVE";
    SubscriptionStatus["PAST_DUE"] = "PAST_DUE";
    SubscriptionStatus["CANCELED"] = "CANCELED";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
