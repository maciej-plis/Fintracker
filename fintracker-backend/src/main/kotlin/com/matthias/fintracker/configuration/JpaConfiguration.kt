package com.matthias.fintracker.configuration

import com.matthias.fintracker.FinTrackerApplication
import com.matthias.fintracker.common.jpa.BaseRepositoryImpl
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.transaction.annotation.EnableTransactionManagement

@EnableJpaAuditing
@EnableTransactionManagement
@EnableJpaRepositories(basePackageClasses = [FinTrackerApplication::class], repositoryBaseClass = BaseRepositoryImpl::class)
@Configuration
class JpaConfiguration
