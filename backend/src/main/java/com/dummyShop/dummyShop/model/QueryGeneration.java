package com.dummyShop.dummyShop.model;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class QueryGeneration {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Product> findByNameContainingKeywords(List<String> keywords, int page, int size) {
        if (keywords == null || keywords.isEmpty()) {
            return Collections.emptyList();
        }

        List<String> nameKeywords = new ArrayList<>();
        List<String> tagKeywords = new ArrayList<>();

        for (String keyword : keywords) {
            if (keyword.startsWith("@")) {

                tagKeywords.add(keyword.substring(1));
            } else {
                nameKeywords.add(keyword);
            }
        }

        StringBuilder jpql = new StringBuilder("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.user LEFT JOIN p.tagSet t WHERE 1=1");

        if (!tagKeywords.isEmpty()) {
            jpql.append(" AND t.name IN :tagKeywords");
        }

        if (!nameKeywords.isEmpty()) {
            jpql.append(" AND (");
            for (int i = 0; i < nameKeywords.size(); i++) {
                if (i > 0) {
                    jpql.append(" OR");
                }
                jpql.append(" LOWER(p.name) LIKE :nameKeyword" + i);
            }
            jpql.append(")");
        }

        Query query = entityManager.createQuery(jpql.toString());

        if (!tagKeywords.isEmpty()) {
            query.setParameter("tagKeywords", tagKeywords);
        }

        for (int i = 0; i < nameKeywords.size(); i++) {
            query.setParameter("nameKeyword" + i, "%" + nameKeywords.get(i).toLowerCase() + "%");
        }

        query.setFirstResult(page * size);
        query.setMaxResults(size);

        return query.getResultList();
    }

    public Long getLengthfindByNameContainingKeywords(List<String> keywords) {
        if (keywords == null || keywords.isEmpty()) {
            return 0L;
        }

        List<String> nameKeywords = new ArrayList<>();
        List<String> tagKeywords = new ArrayList<>();

        for (String keyword : keywords) {
            if (keyword.startsWith("@")) {
                tagKeywords.add(keyword.substring(1));
            } else {
                nameKeywords.add(keyword);
            }
        }

        StringBuilder jpql = new StringBuilder("SELECT COUNT(DISTINCT p) FROM Product p LEFT JOIN p.user LEFT JOIN p.tagSet t WHERE 1=1");

        if (!tagKeywords.isEmpty()) {
            jpql.append(" AND t.name IN :tagKeywords");
        }

        if (!nameKeywords.isEmpty()) {
            jpql.append(" AND (");
            for (int i = 0; i < nameKeywords.size(); i++) {
                if (i > 0) {
                    jpql.append(" OR");
                }
                jpql.append(" LOWER(p.name) LIKE :nameKeyword" + i);
            }
            jpql.append(")");
        }

        Query query = entityManager.createQuery(jpql.toString());

        if (!tagKeywords.isEmpty()) {
            query.setParameter("tagKeywords", tagKeywords);
        }

        for (int i = 0; i < nameKeywords.size(); i++) {
            query.setParameter("nameKeyword" + i, "%" + nameKeywords.get(i).toLowerCase() + "%");
        }

        return (Long) query.getSingleResult();
    }
}
