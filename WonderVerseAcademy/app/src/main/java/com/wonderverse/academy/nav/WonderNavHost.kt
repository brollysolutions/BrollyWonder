package com.wonderverse.academy.nav

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.wonderverse.academy.data.JourneyState
import com.wonderverse.academy.data.PlayerState
import com.wonderverse.academy.ui.screens.*

object Routes {
    const val SPLASH = "splash"
    const val AVATAR = "avatar"
    const val MAP = "map"
    const val KINGDOM_DETAIL = "kingdom_detail"
    const val LESSON = "lesson"
    const val PET = "pet"
    const val REWARDS = "rewards"
    const val PARENTS = "parents"
}

@Composable
fun WonderNavHost() {
    val navController: NavHostController = rememberNavController()

    NavHost(navController = navController, startDestination = Routes.SPLASH) {
        composable(Routes.SPLASH) {
            SplashScreen(onFinished = {
                val targetRoute = if (PlayerState.isProfileSet.value) Routes.MAP else Routes.AVATAR
                navController.navigate(targetRoute) {
                    popUpTo(Routes.SPLASH) { inclusive = true }
                }
            })
        }
        composable(Routes.AVATAR) {
            AvatarScreen(
                onDone = {
                    navController.navigate(Routes.MAP) {
                        popUpTo(Routes.AVATAR) { inclusive = true }
                    }
                },
                onBack = if (PlayerState.isProfileSet.value) { { navController.popBackStack() } } else null
            )
        }
        composable(Routes.MAP) {
            KingdomMapScreen(
                onOpenKingdom = { kingdomId ->
                    JourneyState.selectKingdom(kingdomId)
                    navController.navigate(Routes.KINGDOM_DETAIL)
                },
                onOpenPet = { navController.navigate(Routes.PET) },
                onOpenRewards = { navController.navigate(Routes.REWARDS) },
                onOpenParents = { navController.navigate(Routes.PARENTS) }
            )
        }
        composable(Routes.KINGDOM_DETAIL) {
            KingdomDetailScreen(
                onBack = { navController.popBackStack() },
                onStartLesson = { navController.navigate(Routes.LESSON) }
            )
        }
        composable(Routes.LESSON) {
            LessonScreen(
                onBack = { navController.popBackStack() },
                onFinish = { navController.popBackStack(Routes.MAP, inclusive = false) }
            )
        }
        composable(Routes.PET) {
            PetScreen(onBack = { navController.popBackStack() })
        }
        composable(Routes.REWARDS) {
            RewardsScreen(onBack = { navController.popBackStack() })
        }
        composable(Routes.PARENTS) {
            ParentDashboardScreen(onBack = { navController.popBackStack() })
        }
    }
}
