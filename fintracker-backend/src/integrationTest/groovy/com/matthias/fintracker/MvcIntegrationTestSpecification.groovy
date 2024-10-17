package com.matthias.fintracker

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.test.web.servlet.MockMvc

@AutoConfigureMockMvc
class MvcIntegrationTestSpecification extends IntegrationTestSpecification {

    @Autowired
    MockMvc mvc
}
