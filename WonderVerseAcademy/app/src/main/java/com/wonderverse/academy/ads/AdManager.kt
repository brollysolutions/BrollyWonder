package com.wonderverse.academy.ads

import android.app.Activity
import android.content.Context
import android.util.Log
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.google.android.gms.ads.rewarded.RewardedAd
import com.google.android.gms.ads.rewarded.RewardedAdLoadCallback

object AdManager {
    private const val TAG = "AdManager"
    // Standard Google Test Ad Unit IDs
    private const val TEST_REWARDED_AD_UNIT_ID = "ca-app-pub-3940256099942544/5224354917"
    private const val TEST_INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3940256099942544/1033173712"

    private var rewardedAd: RewardedAd? = null
    private var interstitialAd: InterstitialAd? = null
    private var isInitialized = false

    fun initialize(context: Context) {
        if (isInitialized) return
        MobileAds.initialize(context) { initializationStatus ->
            Log.d(TAG, "AdMob MobileAds initialized: ${initializationStatus.adapterStatusMap}")
            isInitialized = true
            loadRewardedAd(context)
            loadInterstitialAd(context)
        }
    }

    fun loadRewardedAd(context: Context) {
        val adRequest = AdRequest.Builder().build()
        RewardedAd.load(
            context,
            TEST_REWARDED_AD_UNIT_ID,
            adRequest,
            object : RewardedAdLoadCallback() {
                override fun onAdFailedToLoad(loadAdError: LoadAdError) {
                    Log.e(TAG, "Rewarded Ad failed to load: ${loadAdError.message}")
                    rewardedAd = null
                }

                override fun onAdLoaded(ad: RewardedAd) {
                    Log.d(TAG, "Rewarded Ad loaded successfully")
                    rewardedAd = ad
                }
            }
        )
    }

    fun loadInterstitialAd(context: Context) {
        val adRequest = AdRequest.Builder().build()
        InterstitialAd.load(
            context,
            TEST_INTERSTITIAL_AD_UNIT_ID,
            adRequest,
            object : InterstitialAdLoadCallback() {
                override fun onAdFailedToLoad(adError: LoadAdError) {
                    Log.e(TAG, "Interstitial Ad failed to load: ${adError.message}")
                    interstitialAd = null
                }

                override fun onAdLoaded(ad: InterstitialAd) {
                    Log.d(TAG, "Interstitial Ad loaded successfully")
                    interstitialAd = ad
                }
            }
        )
    }

    fun showRewardedAd(activity: Activity, onRewardEarned: (amount: Int) -> Unit) {
        rewardedAd?.let { ad ->
            ad.show(activity) { rewardItem ->
                val rewardAmount = rewardItem.amount.takeIf { it > 0 } ?: 50
                Log.d(TAG, "User earned reward: $rewardAmount")
                onRewardEarned(rewardAmount)
                loadRewardedAd(activity)
            }
        } ?: run {
            Log.w(TAG, "Rewarded ad was not ready yet, giving fallback reward")
            onRewardEarned(50)
            loadRewardedAd(activity)
        }
    }

    fun showInterstitialAd(activity: Activity, onDismissed: () -> Unit) {
        interstitialAd?.let { ad ->
            ad.show(activity)
            loadInterstitialAd(activity)
            onDismissed()
        } ?: run {
            Log.w(TAG, "Interstitial ad was not ready yet, triggering callback")
            loadInterstitialAd(activity)
            onDismissed()
        }
    }
}
